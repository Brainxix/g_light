import os
from io import BytesIO

from django.core.files.base import ContentFile
from PIL import Image, ImageOps

MAX_SIDE = 1800


def optimize_image(field_file):
    """
    Shrink a freshly uploaded photo so phone-camera originals (often 5-10 MB)
    don't slow the site down: fix rotation, cap the longest side at 1800px and
    re-save as a JPEG. Returns (new_name, ContentFile), or None if the file
    can't be read as an image (it is then saved untouched).
    """
    try:
        field_file.open()
        img = Image.open(field_file)
        img = ImageOps.exif_transpose(img)
        if img.mode not in ('RGB', 'L'):
            # flatten transparency onto white so JPEG output looks right
            background = Image.new('RGB', img.size, (255, 255, 255))
            alpha = img.convert('RGBA')
            background.paste(alpha, mask=alpha.split()[-1])
            img = background
        elif img.mode == 'L':
            img = img.convert('RGB')
        img.thumbnail((MAX_SIDE, MAX_SIDE))
        buffer = BytesIO()
        img.save(buffer, format='JPEG', quality=82, optimize=True, progressive=True)
    except Exception:
        return None
    base = os.path.splitext(os.path.basename(field_file.name))[0]
    return f'{base}.jpg', ContentFile(buffer.getvalue())
