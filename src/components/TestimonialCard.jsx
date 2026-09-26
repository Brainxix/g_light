export default function TestimonialCard({ quote, name }) {
  return (
    <div className="testimonial-card">
      <p>&ldquo;{quote}&rdquo;</p>
      <div className="name">{name}</div>
    </div>
  );
}