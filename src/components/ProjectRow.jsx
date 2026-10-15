export default function ProjectRow({ name, location, sector, description }) {
  return (
    <article className="proj-row">
      <h3 className="proj-name">{name}</h3>
      <p className="proj-where">
        {location}
        <span>{sector}</span>
      </p>
      <p className="proj-desc">{description}</p>
    </article>
  );
}
