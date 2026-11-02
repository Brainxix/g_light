import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// Opens when a project card is clicked: big photo, thumbnails for every photo
// the owner uploaded, and the project details. Arrow keys / swipe / Esc work.
export default function ProjectModal({ project, onClose }) {
  const photos = [project.image, ...(project.images || []).map((i) => i.image)].filter(Boolean);
  const [index, setIndex] = useState(0);
  const closeRef = useRef(null);
  const touchX = useRef(null);

  const go = (step) => setIndex((i) => (i + step + photos.length) % photos.length);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null || photos.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const meta = [project.location, project.year].filter(Boolean).join(' · ');

  return createPortal(
    <div className="pm-backdrop" onClick={onClose} role="presentation">
      <div
        className="pm"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="pm-close" onClick={onClose} ref={closeRef} aria-label="Close">
          &times;
        </button>

        <div className="pm-media">
          <div className="pm-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {photos.length ? (
              <img key={photos[index]} src={photos[index]} alt={`${project.title}, photo ${index + 1}`} />
            ) : (
              <p className="pm-nophoto">No photo yet</p>
            )}
            {photos.length > 1 && (
              <>
                <button type="button" className="pm-nav pm-prev" onClick={() => go(-1)} aria-label="Previous photo">
                  &#8249;
                </button>
                <button type="button" className="pm-nav pm-next" onClick={() => go(1)} aria-label="Next photo">
                  &#8250;
                </button>
                <span className="pm-count">
                  {index + 1} / {photos.length}
                </span>
              </>
            )}
          </div>

          {photos.length > 1 && (
            <div className="pm-thumbs">
              {photos.map((src, i) => (
                <button
                  type="button"
                  key={src}
                  className={i === index ? 'active' : ''}
                  onClick={() => setIndex(i)}
                  aria-label={`Show photo ${i + 1}`}
                >
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pm-info">
          <p className="pm-eyebrow">{project.category_label}</p>
          <h2>{project.title}</h2>
          {meta ? <p className="pm-meta">{meta}</p> : null}
          {project.sector_label ? <p className="pm-sector">{project.sector_label}</p> : null}
          {project.capacity ? <p className="pm-capacity">{project.capacity}</p> : null}
          {project.technology ? (
            <p className="pm-row"><span>Technology</span>{project.technology}</p>
          ) : null}
          {project.services?.length ? (
            <div className="pm-row">
              <span>Scope of work</span>
              <ul>
                {project.services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {project.description ? <p className="pm-desc">{project.description}</p> : null}
        </div>
      </div>
    </div>,
    document.body
  );
}
