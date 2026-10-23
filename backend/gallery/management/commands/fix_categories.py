from django.core.management.base import BaseCommand

from gallery.models import Project

OLD_TO_NEW = {
    'appliance': 'electrical',
    'interior': 'electrical',
    'conduit': 'electrical',
    'solar': 'solar',
}


class Command(BaseCommand):
    help = 'Move projects saved with the old categories onto the new capability list.'

    def handle(self, *args, **options):
        total = 0
        for old, new in OLD_TO_NEW.items():
            if old != new:
                total += Project.objects.filter(category=old).update(category=new)
        self.stdout.write(self.style.SUCCESS(f'Updated {total} project(s).'))
