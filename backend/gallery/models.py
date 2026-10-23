from django.db import models

from .utils import optimize_image

# These slugs match the six capabilities on the website.
CATEGORY_CHOICES = [
    ('electrical', 'Electrical Engineering'),
    ('solar', 'Solar Energy'),
    ('power-systems', 'Power Systems'),
    ('commercial-industrial', 'Commercial & Industrial'),
    ('maintenance', 'Maintenance & Support'),
    ('consulting', 'Energy Consulting'),
]

SECTOR_CHOICES = [
    ('hospitality', 'Hospitality'),
    ('residential', 'Residential'),
    ('commercial', 'Commercial'),
    ('institution', 'Institution'),
    ('industrial', 'Industrial'),
    ('other', 'Other'),
]


class Project(models.Model):
    """A completed project shown on the website."""

    title = models.CharField('Project name', max_length=200)
    category = models.CharField('Capability', max_length=30, choices=CATEGORY_CHOICES)
    sector = models.CharField(max_length=20, choices=SECTOR_CHOICES, default='other')
    location = models.CharField(max_length=120, blank=True, help_text='Town or city, e.g. Yenagoa')
    year = models.PositiveSmallIntegerField(null=True, blank=True, help_text='Year completed')
    capacity = models.CharField(
        'System size', max_length=60, blank=True, help_text='e.g. 15 kVA, 10 kW solar'
    )
    technology = models.CharField(max_length=200, blank=True, help_text='e.g. Hybrid inverter, lithium battery')
    services = models.TextField('Services provided', blank=True, help_text='One per line')
    # Kept as "caption" so existing rows survive; shown as the description.
    caption = models.TextField('Description', blank=True)
    image = models.ImageField('Main photo', upload_to='projects/')
    featured = models.BooleanField(default=False, help_text='Show on the Home page')
    is_published = models.BooleanField('Published', default=True, help_text='Untick to hide from the website')
    sort_order = models.PositiveIntegerField(default=0, help_text='Lower numbers show first')
    date_added = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['sort_order', '-year', '-date_added']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Only touch new uploads, not photos that are already stored.
        if self.image and not self.image._committed:
            result = optimize_image(self.image)
            if result:
                name, content = result
                self.image.save(name, content, save=False)
        super().save(*args, **kwargs)


class ProjectImage(models.Model):
    """Extra photos for a project."""

    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='projects/')
    caption = models.CharField(max_length=200, blank=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return f'{self.project.title} photo'

    def save(self, *args, **kwargs):
        if self.image and not self.image._committed:
            result = optimize_image(self.image)
            if result:
                name, content = result
                self.image.save(name, content, save=False)
        super().save(*args, **kwargs)


class SiteStat(models.Model):
    """A number shown in the Home page metrics bar. Edit in the admin."""

    value = models.CharField(max_length=20, help_text='e.g. 10+  or  24/7')
    label = models.CharField(max_length=80, help_text='e.g. Years of electrical experience')
    sort_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField('Published', default=True)

    class Meta:
        ordering = ['sort_order', 'id']
        verbose_name = 'Home page number'
        verbose_name_plural = 'Home page numbers'

    def __str__(self):
        return f'{self.value} {self.label}'
