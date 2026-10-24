"""Adds live numbers to the admin home page (the G-LIGHT control room)."""
from datetime import timedelta

from django.conf import settings
from django.urls import reverse
from django.utils import timezone

from contact.models import ContactSubmission
from gallery.models import Project


def _site_url():
    explicit = getattr(settings, 'FRONTEND_URL', '')
    if explicit:
        return explicit
    origins = [o for o in getattr(settings, 'CORS_ALLOWED_ORIGINS', []) if o.startswith('https://')]
    return origins[0] if origins else ''


def dashboard_context():
    now = timezone.now()
    leads = ContactSubmission.objects.all()
    total = leads.count()

    pipeline = []
    for key, label in ContactSubmission.STATUS_CHOICES:
        n = leads.filter(status=key).count()
        pipeline.append({
            'key': key,
            'label': label,
            'count': n,
            'percent': round(n * 100 / total) if total else 0,
            'url': f"{reverse('admin:contact_contactsubmission_changelist')}?status__exact={key}",
        })

    return {
        'gl_stats': {
            'projects_live': Project.objects.filter(is_published=True).count(),
            'projects_total': Project.objects.count(),
            'leads_total': total,
            'leads_new': leads.filter(status='new').count(),
            'leads_week': leads.filter(created_at__gte=now - timedelta(days=7)).count(),
            'leads_won': leads.filter(status__in=['won', 'completed']).count(),
        },
        'gl_pipeline': pipeline,
        'gl_recent_leads': leads[:5],
        'gl_recent_projects': Project.objects.order_by('-date_added')[:4],
        'gl_site_url': _site_url(),
    }
