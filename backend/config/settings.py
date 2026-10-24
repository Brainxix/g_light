"""
Django settings for the G-LIGHT backend.

Everything that changes between your laptop and the live server is read from
environment variables, so the same code runs in both places. With no variables
set it behaves like the local development setup: SQLite database, photos saved
in the media/ folder, DEBUG on.
"""
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent


def env_list(name, default=''):
    return [item.strip() for item in os.environ.get(name, default).split(',') if item.strip()]


# --- Core -----------------------------------------------------------------

# On the live server set DEBUG=0 and a long random SECRET_KEY.
DEBUG = os.environ.get('DEBUG', '1') == '1'
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-local-development-only')

if not DEBUG and SECRET_KEY.startswith('django-insecure'):
    raise RuntimeError('Set a real SECRET_KEY environment variable when DEBUG is off.')

ALLOWED_HOSTS = ['localhost', '127.0.0.1'] + env_list('ALLOWED_HOSTS')
# Render tells every web service its own hostname.
RENDER_HOST = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_HOST:
    ALLOWED_HOSTS.append(RENDER_HOST)

# The admin login form needs the site's own https address trusted.
CSRF_TRUSTED_ORIGINS = env_list('CSRF_TRUSTED_ORIGINS')
if RENDER_HOST:
    CSRF_TRUSTED_ORIGINS.append(f'https://{RENDER_HOST}')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'gallery',
    'contact',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # serves the admin's CSS/JS in production
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'config' / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# --- Database -------------------------------------------------------------
# Locally: SQLite. Live: set DATABASE_URL to the Supabase Postgres connection string.

if os.environ.get('DATABASE_URL'):
    import dj_database_url

    DATABASES = {
        'default': dj_database_url.parse(
            os.environ['DATABASE_URL'],
            conn_max_age=600,
            conn_health_checks=True,
        )
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Africa/Lagos'
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# --- Static files (admin CSS/JS) ------------------------------------------

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'config' / 'static']

# --- Uploaded photos --------------------------------------------------------
# Locally: saved in the media/ folder.
# Live: sent to a Supabase Storage bucket (set the SUPABASE_* variables).

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

STORAGES = {
    'default': {'BACKEND': 'django.core.files.storage.FileSystemStorage'},
    'staticfiles': {'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage'},
}

SUPABASE_PROJECT_REF = os.environ.get('SUPABASE_PROJECT_REF', '')
SUPABASE_BUCKET = os.environ.get('SUPABASE_BUCKET', '')
SUPABASE_S3_KEY_ID = os.environ.get('SUPABASE_S3_KEY_ID', '')
SUPABASE_S3_SECRET = os.environ.get('SUPABASE_S3_SECRET', '')

if SUPABASE_PROJECT_REF and SUPABASE_BUCKET and SUPABASE_S3_KEY_ID and SUPABASE_S3_SECRET:
    STORAGES['default'] = {
        'BACKEND': 'storages.backends.s3.S3Storage',
        'OPTIONS': {
            'bucket_name': SUPABASE_BUCKET,
            'access_key': SUPABASE_S3_KEY_ID,
            'secret_key': SUPABASE_S3_SECRET,
            'endpoint_url': os.environ.get(
                'SUPABASE_S3_ENDPOINT',
                f'https://{SUPABASE_PROJECT_REF}.storage.supabase.co/storage/v1/s3',
            ),
            'region_name': os.environ.get('SUPABASE_S3_REGION', 'us-east-1'),
            # Public bucket: photos are served straight from Supabase's public URL.
            'custom_domain': f'{SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/{SUPABASE_BUCKET}',
            'querystring_auth': False,
            'file_overwrite': False,
            'default_acl': None,
            'signature_version': 's3v4',
            'addressing_style': 'path',
        },
    }

# --- CORS: which websites may call this API ----------------------------------
# Add your live website address in CORS_ALLOWED_ORIGINS on the server,
# e.g. https://glight-roan.vercel.app

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
] + env_list('CORS_ALLOWED_ORIGINS')

# --- Django REST framework ----------------------------------------------------

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': ['rest_framework.permissions.AllowAny'],
    'DEFAULT_THROTTLE_RATES': {'contact': '10/hour'},
    'NUM_PROXIES': 1 if RENDER_HOST else 0,  # so the limit counts the visitor, not Render's proxy
    'DEFAULT_RENDERER_CLASSES': ['rest_framework.renderers.JSONRenderer'],
}

# --- Email: new-lead notifications (optional) ---------------------------------
# Leave EMAIL_HOST unset and nothing is sent; leads are still saved and shown in the admin.

EMAIL_HOST = os.environ.get('EMAIL_HOST', '')
if EMAIL_HOST:
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_PORT = int(os.environ.get('EMAIL_PORT', '587'))
    EMAIL_USE_TLS = os.environ.get('EMAIL_USE_TLS', '1') == '1'
    EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', '')
    EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '')
else:
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', 'G-LIGHT <no-reply@example.com>')
LEAD_NOTIFY_EMAIL = os.environ.get('LEAD_NOTIFY_EMAIL', '')

# --- Security when live -------------------------------------------------------

if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
