import { Link } from 'react-router-dom';

export default function ServiceCard({ title, description, to, highlight = false }) {
  return (
    <Link to={to} className={`service-card${highlight ? ' solar' : ''}`}>
      <div className="icon" />
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}