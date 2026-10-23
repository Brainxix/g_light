from django.db import models


class ContactSubmission(models.Model):
    """A lead from the Start a project form, tracked through a sales pipeline."""

    SERVICE_CHOICES = [
        ('electrical', 'Electrical Engineering'),
        ('solar', 'Solar Energy'),
        ('power-systems', 'Power Systems'),
        ('commercial-industrial', 'Commercial & Industrial'),
        ('maintenance', 'Maintenance & Support'),
        ('consulting', 'Energy Consulting'),
        ('other', 'Other / not sure'),
    ]

    BUDGET_CHOICES = [
        ('under_1m', 'Under ₦1 million'),
        ('1_5m', '₦1 – 5 million'),
        ('5_20m', '₦5 – 20 million'),
        ('20m_plus', 'Over ₦20 million'),
        ('unsure', 'Not sure yet'),
    ]

    TIMELINE_CHOICES = [
        ('asap', 'As soon as possible'),
        ('1_3_months', 'Within 1–3 months'),
        ('3_6_months', 'In 3–6 months'),
        ('planning', 'Still planning'),
    ]

    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('quoted', 'Quoted'),
        ('negotiation', 'Negotiation'),
        ('won', 'Won'),
        ('completed', 'Completed'),
        ('lost', 'Lost'),
    ]

    # What the visitor sends
    name = models.CharField(max_length=120)
    phone = models.CharField(max_length=30)
    email = models.EmailField()
    service = models.CharField('Type of project', max_length=30, choices=SERVICE_CHOICES, blank=True)
    location = models.CharField(max_length=120, blank=True)
    size = models.CharField('Rough size', max_length=120, blank=True)
    budget = models.CharField(max_length=20, choices=BUDGET_CHOICES, blank=True)
    timeline = models.CharField(max_length=20, choices=TIMELINE_CHOICES, blank=True)
    message = models.TextField()

    # What G-LIGHT tracks
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new', db_index=True)
    internal_notes = models.TextField(blank=True, help_text='Only visible here in the admin')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'lead'
        verbose_name_plural = 'leads'

    def __str__(self):
        return f'{self.name} — {self.get_service_display() or "general"}'
