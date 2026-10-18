// A thin circuit line between sections with a pulse of current travelling along it.
export default function Circuit() {
  return (
    <div className="wrap" aria-hidden="true">
      <div className="circuit">
        <i className="circuit-node" style={{ left: '0%' }} />
        <i className="circuit-node" style={{ left: '50%' }} />
        <i className="circuit-node" style={{ left: '100%' }} />
        <i className="circuit-pulse" />
      </div>
    </div>
  );
}
