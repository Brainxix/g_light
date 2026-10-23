from rest_framework import serializers

from .models import Project, ProjectImage, SiteStat


def absolute(request, f):
    """Full URL for a stored file (works for local media and Supabase alike)."""
    if not f:
        return None
    url = f.url
    return request.build_absolute_uri(url) if request else url


class ProjectImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'caption']

    def get_image(self, obj):
        return absolute(self.context.get('request'), obj.image)


class ProjectSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    images = ProjectImageSerializer(many=True, read_only=True)
    description = serializers.CharField(source='caption', read_only=True)
    category_label = serializers.CharField(source='get_category_display', read_only=True)
    sector_label = serializers.CharField(source='get_sector_display', read_only=True)
    services = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'category', 'category_label', 'sector', 'sector_label',
            'location', 'year', 'capacity', 'technology', 'services', 'description',
            'featured', 'image', 'images',
        ]

    def get_image(self, obj):
        return absolute(self.context.get('request'), obj.image)

    def get_services(self, obj):
        return [line.strip() for line in obj.services.splitlines() if line.strip()]


class SiteStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteStat
        fields = ['id', 'value', 'label']
