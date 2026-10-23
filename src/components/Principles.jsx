import { PRINCIPLES } from '../content.js';

export default function Principles() {
  return (
    <div className="why-grid">
      {PRINCIPLES.map((item) => (
        <div className="why-item" key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}
