from rest_framework import serializers

from .models import ContactSubmission


class ContactSubmissionSerializer(serializers.ModelSerializer):
    # Honeypot: real visitors never see or fill this. Bots often do.
    website = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = ContactSubmission
        fields = [
            'id', 'name', 'phone', 'email', 'service', 'location', 'size',
            'budget', 'timeline', 'message', 'website',
        ]
        read_only_fields = ['id']
        extra_kwargs = {
            'service': {'required': False, 'allow_blank': True},
            'location': {'required': False, 'allow_blank': True},
            'size': {'required': False, 'allow_blank': True},
            'budget': {'required': False, 'allow_blank': True},
            'timeline': {'required': False, 'allow_blank': True},
        }
