from django.contrib import admin
from django.utils.html import format_html

from .models import Project, ProjectImage, SiteStat


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1
    fields = ('image', 'caption', 'sort_order')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('thumbnail', 'title', 'location', 'category', 'year', 'featured', 'is_published', 'sort_order')
    list_display_links = ('thumbnail', 'title')
    list_editable = ('featured', 'is_published', 'sort_order')
    list_filter = ('category', 'sector', 'featured', 'is_published')
    search_fields = ('title', 'location', 'caption')
    inlines = [ProjectImageInline]
    fieldsets = (
        ('Project', {'fields': ('title', 'category', 'sector', 'location', 'year')}),
        ('Details', {'fields': ('capacity', 'technology', 'services', 'caption')}),
        ('Main photo', {'fields': ('image',), 'description': 'Large photos are resized automatically. Add more photos below.'}),
        ('Website', {'fields': ('featured', 'is_published', 'sort_order')}),
    )

    @admin.display(description='Photo')
    def thumbnail(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:48px;border-radius:4px;" />', obj.image.url)
        return '—'


@admin.register(SiteStat)
class SiteStatAdmin(admin.ModelAdmin):
    list_display = ('value', 'label', 'sort_order', 'is_published')
    list_editable = ('sort_order', 'is_published')
