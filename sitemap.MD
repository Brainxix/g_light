# G-Light Electrical — Sitemap

## 1. Site hierarchy

```
G-Light Electrical (/)
├── Home                /
├── Services             /services
├── Solar                /solar
├── About                /about
├── Gallery              /gallery
└── Contact              /contact
```

- Flat structure, no nested/child pages — all 6 pages sit at the top level.
- Every page is reachable from the Navbar and Footer.

## 2. Navigation

**Navbar (all pages):** Home · Services · Solar · About · Gallery · Contact — plus a persistent "Get a quote" button linking to `/contact`.

**Footer (all pages):** same 6 links, repeated, plus phone number and hours.

## 3. Page-by-page outline

### Home — `/`
```
[ Navbar                                   ]
[ Hero: headline + CTA                     ]
[ Service overview: 4 cards → link to      ]
[   Services/Solar pages                   ]
[ Trust stats bar                          ]
[ Testimonials                             ]
[ CTA banner → Contact                     ]
[ Footer                                   ]
```

### Services — `/services`
```
[ Navbar ]
[ Page intro ]
[ Appliance installation section ]
[ Interior decoration section ]
[ Full conduit wiring section ]
[ Half conduit wiring section ]
[ Maintenance & other work section ]
[ CTA → Contact ]
[ Footer ]
```

### Solar — `/solar`
```
[ Navbar ]
[ Hero: solar-specific headline + CTA ]
[ What's included (install + maintenance) ]
[ Process / timeline ]
[ Financing / incentives ]
[ FAQ ]
[ CTA → Contact ]
[ Footer ]
```

### About — `/about`
```
[ Navbar ]
[ Company story ]
[ Licensing / credentials ]
[ Team (optional) ]
[ Service area ]
[ CTA → Contact ]
[ Footer ]
```

### Gallery — `/gallery`
```
[ Navbar ]
[ Page intro ]
[ Category filter: All / Appliance / Interior / Solar / Conduit ]
[ Photo grid (fetched from Django API) ]
[ CTA → Contact ]
[ Footer ]
```

### Contact — `/contact`
```
[ Navbar ]
[ Contact form: name, phone, email, service needed, message ]
[ Phone, hours, service area ]
[ Map (optional) ]
[ Footer ]
```

## 4. Cross-linking notes
- Home's service cards link directly to `/services` and `/solar` (solar gets its own card, not folded into the others).
- Every page ends in a CTA pointing to `/contact` — no dead ends.
- Gallery is the only page that depends on the Django API; all others are static.