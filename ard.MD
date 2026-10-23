# G-Light Electrical — Architecture Doc (ARD)

## 1. System overview
Two systems working together:
- **React** — the full frontend (Home, Services, Solar, About, Gallery, Contact). Static/stateless except Gallery.
- **Django + DRF** — backend serving only the Gallery data, with Django admin as the owner's upload interface.

```
[Owner] → Django Admin → Project model → DRF API (JSON) → React Gallery page → [Site visitor]
```

## 2. Django app

### Model: `Project`
| Field      | Type                | Notes                                  |
|------------|---------------------|-----------------------------------------|
| title      | CharField           | e.g. "Kitchen appliance install"       |
| category   | CharField (choices) | appliance / interior / solar / conduit |
| image      | ImageField          | uploaded via admin                     |
| caption    | TextField, optional | short case-study note                  |
| date_added | DateField, auto     | for default ordering (newest first)    |

### Admin
- Register `Project` in `admin.py` with `list_display` (title, category, date_added) and image preview
- Owner logs in at `/admin`, clicks "Add Project," uploads a photo, picks a category, saves — no code touched

### API (DRF)
- `GET /api/projects/` — list all, supports `?category=solar` filter
- Read-only endpoint (`ReadOnlyModelViewSet`) — no write access from the public API; uploads only happen through admin
- Serializer exposes: id, title, category, image URL, caption

## 3. React app

### Pages (routes)
- `/` Home
- `/services`
- `/solar`
- `/about`
- `/gallery` — only page that fetches from the Django API
- `/contact`

### Component inventory
| Component        | Used on           | Notes                                  |
|-------------------|--------------------|------------------------------------------|
| Navbar            | all pages          | links to all 6 routes                  |
| Footer            | all pages          | contact info, hours                    |
| Hero              | Home, Solar        | headline + CTA, content differs per page |
| ServiceCard       | Home, Services     | icon/title/description/link            |
| StatBlock         | Home               | years, jobs completed, response time   |
| TestimonialCard   | Home               | quote + name                           |
| GalleryGrid       | Gallery            | fetches `/api/projects/`, filter by category |
| ProjectCard       | Gallery            | single photo + title + category tag    |
| ContactForm       | Contact            | posts to form handler (see below)      |
| CTASection        | Home, Solar, Services | reusable banner with button          |

### Data flow
- Every page except Gallery uses hardcoded/static content (props or a local `content.js` file)
- Gallery page: `useEffect` fetches `GET /api/projects/` on load, stores in state, renders `GalleryGrid`
- Contact form: posts to a form-handling service (e.g. Formspree) — no backend needed for this since we're not storing/managing leads yet

## 4. Deployment
- **React app**: static hosting (Vercel or Netlify)
- **Django app**: needs a real host with a database (Render, Railway, or similar) since it serves the admin + API
- **CORS**: Django must allow requests from the React app's domain (`django-cors-headers`)
- **Media storage**: uploaded images need persistent storage — either the host's disk (fine to start) or cloud storage (S3-compatible) if the host's disk isn't persistent

## 5. Out of scope for v1
- Auth for the public site (only the owner logs into Django admin)
- Storing contact form submissions in a database (goes straight to email via form service)
- Editable content for pages other than Gallery