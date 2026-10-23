from django.conf import settings
from django.core.mail import send_mail
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from .models import ContactSubmission
from .serializers import ContactSubmissionSerializer


class ContactThrottle(AnonRateThrottle):
    scope = 'contact'


class ContactSubmissionCreateView(generics.CreateAPIView):
    """
    POST /api/contact/  -> create a new lead.
    CreateAPIView only (no list/retrieve), so leads can't be read back through
    the public API, only in /admin.
    """

    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    throttle_classes = [ContactThrottle]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if serializer.validated_data.get('website'):
            # Honeypot filled in: pretend it worked, save nothing.
            return Response({'ok': True}, status=status.HTTP_201_CREATED)
        data = {k: v for k, v in serializer.validated_data.items() if k != 'website'}
        lead = ContactSubmission.objects.create(**data)
        self.notify(lead)
        return Response({'ok': True, 'id': lead.id}, status=status.HTTP_201_CREATED)

    @staticmethod
    def notify(lead):
        """Email the team about a new lead. Does nothing unless LEAD_NOTIFY_EMAIL is set."""
        to = getattr(settings, 'LEAD_NOTIFY_EMAIL', '')
        if not to:
            return
        body = (
            f'Name: {lead.name}\nPhone: {lead.phone}\nEmail: {lead.email}\n'
            f'Type: {lead.get_service_display()}\nLocation: {lead.location}\n'
            f'Size: {lead.size}\nBudget: {lead.get_budget_display()}\n'
            f'Timeline: {lead.get_timeline_display()}\n\n{lead.message}\n'
        )
        send_mail(
            f'New G-LIGHT lead: {lead.name}',
            body,
            settings.DEFAULT_FROM_EMAIL,
            [e.strip() for e in to.split(',') if e.strip()],
            fail_silently=True,
        )
