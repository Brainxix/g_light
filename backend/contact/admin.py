from django.contrib import admin
from django.utils.html import format_html

from .models import ContactSubmission


def _set_status(status):
    def action(modeladmin, request, queryset):
        updated = queryset.update(status=status)
        modeladmin.message_user(request, f'{updated} lead(s) moved to "{status}".')

    action.short_description = f'Move selected to: {status.capitalize()}'
    action.__name__ = f'mark_{status}'
    return action


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'call', 'service', 'location', 'budget', 'status', 'created_at')
    list_editable = ('status',)
    list_filter = ('status', 'service', 'budget', 'created_at')
    search_fields = ('name', 'phone', 'email', 'location', 'message', 'internal_notes')
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at', 'updated_at')
    actions = [_set_status(s) for s, _ in ContactSubmission.STATUS_CHOICES]
    fieldsets = (
        ('Lead', {'fields': ('name', 'phone', 'email', 'service', 'location', 'size', 'budget', 'timeline', 'message')}),
        ('Pipeline', {'fields': ('status', 'internal_notes')}),
        ('Record', {'fields': ('created_at', 'updated_at')}),
    )

    @admin.display(description='Phone')
    def call(self, obj):
        return format_html('<a href="tel:{}">{}</a>', obj.phone, obj.phone)
