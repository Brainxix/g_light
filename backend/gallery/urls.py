from rest_framework.routers import DefaultRouter

from .views import ProjectViewSet, SiteStatViewSet

router = DefaultRouter()
router.register('projects', ProjectViewSet, basename='project')
router.register('stats', SiteStatViewSet, basename='stat')

urlpatterns = router.urls
