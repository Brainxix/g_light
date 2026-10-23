from rest_framework import viewsets

from .models import Project, SiteStat
from .serializers import ProjectSerializer, SiteStatSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/projects/                    -> published projects
    GET /api/projects/?category=solar     -> one capability
    GET /api/projects/?featured=1         -> the ones flagged for the Home page
    GET /api/projects/<id>/               -> one project
    """

    serializer_class = ProjectSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Project.objects.filter(is_published=True).prefetch_related('images')
        category = self.request.query_params.get('category')
        if category and category != 'all':
            qs = qs.filter(category=category)
        if self.request.query_params.get('featured') in ('1', 'true', 'True'):
            qs = qs.filter(featured=True)
        return qs


class SiteStatViewSet(viewsets.ReadOnlyModelViewSet):
    """GET /api/stats/ -> the numbers for the Home page metrics bar."""

    serializer_class = SiteStatSerializer
    pagination_class = None
    queryset = SiteStat.objects.filter(is_published=True)
