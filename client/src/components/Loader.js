function Loader({ label = 'Loading' }) {
  return (
    <span className="loader-wrap" role="status">
      <span className="spinner" aria-hidden="true" />
      {label}
    </span>
  );
}

export default Loader;
