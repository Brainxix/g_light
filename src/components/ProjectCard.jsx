// One project as a photo card. Clicking it opens the photo window (ProjectModal).
export default function ProjectCard({ project: p, onOpen }) {
  const open = () => onOpen(p);
  return (
    <article
      className="project-card clickable"
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      }}
      aria-label={`View ${p.title}`}
    >
      <div className="thumb">
        {p.image ? <img src={p.image} alt={p.title} loading="lazy" /> : null}
        {p.images && p.images.length > 0 ? (
          <span className="photo-badge">{p.images.length + 1} photos</span>
        ) : null}
      </div>
      <div className="info">
        <h3>{p.title}</h3>
        <p className="meta">
          {[p.location, p.year].filter(Boolean).join(' · ')}
          {p.sector_label ? <span>{p.sector_label}</span> : null}
        </p>
        {p.capacity ? <p className="capacity">{p.capacity}</p> : null}
        {p.description ? <p className="desc">{p.description}</p> : null}
        <span className="view-more">View project &rarr;</span>
      </div>
    </article>
  );
}
