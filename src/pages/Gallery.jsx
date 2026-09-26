import { useState } from 'react';

// Placeholder data — once the Django backend is set up, replace this with:
//   const [projects, setProjects] = useState([]);
//   useEffect(() => {
//     fetch('http://localhost:8000/api/projects/')
//       .then((res) => res.json())
//       .then(setProjects);
//   }, []);
const PROJECTS = [
  { id: 1, title: 'Kitchen appliance install', category: 'appliance' },
  { id: 2, title: 'Living room lighting redesign', category: 'interior' },
  { id: 3, title: 'Rooftop solar array', category: 'solar' },
  { id: 4, title: 'Full conduit rewire', category: 'conduit' },
  { id: 5, title: 'Water heater install', category: 'appliance' },
  { id: 6, title: 'Accent lighting, dining room', category: 'interior' },
  { id: 7, title: 'Solar panel maintenance visit', category: 'solar' },
  { id: 8, title: 'Half conduit upgrade', category: 'conduit' },
];

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Appliance', value: 'appliance' },
  { label: 'Interior', value: 'interior' },
  { label: 'Solar', value: 'solar' },
  { label: 'Conduit', value: 'conduit' },
];

export default function Gallery() {
  const [active, setActive] = useState('all');

  const visible =
    active === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">Our work</div>
        <h1>Gallery</h1>
        <p>A look at recent jobs across appliance installs, interior work, solar, and conduit wiring.</p>
      </section>

      <div className="gallery-filter">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={active === f.value ? 'active' : ''}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {visible.map((project) => (
          <div className={`gallery-card${project.category === 'solar' ? ' solar' : ''}`} key={project.id}>
            <div className="thumb">Photo placeholder</div>
            <div className="info">
              <h4>{project.title}</h4>
              <span>{project.category}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}