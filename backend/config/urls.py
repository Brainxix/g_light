from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from django.views.generic import RedirectView

admin.site.site_header = 'G-LIGHT admin'
admin.site.site_title = 'G-LIGHT admin'
admin.site.index_title = 'Projects, leads and site content'


def health(request):
    """Used by the host to check the server is up."""
    return JsonResponse({'status': 'ok'})


urlpatterns = [
    path('', RedirectView.as_view(url='/admin/', permanent=False)),
    path('health/', health),
    path('admin/', admin.site.urls),
    path('api/', include('gallery.urls')),
    path('api/', include('contact.urls')),
]

# Local development only: serve uploaded photos from the media/ folder.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
