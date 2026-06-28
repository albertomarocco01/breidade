// Root loading fallback, shown while a route segment renders on the server (the
// whole site is dynamic — getLocale() reads the cookie per request). Kept quiet
// and minimal to honour the static-first, no-flash intent: a faint centred brand
// mark. React only shows this if the server render doesn't resolve quickly, so
// fast navigations never flash it. Motion is CSS and respects reduced-motion.
export default function Loading() {
  return (
    <div className="state-loading" role="status" aria-label="loading">
      <span className="state-loading-mark" aria-hidden="true" lang="zh">
        設計師
      </span>
    </div>
  );
}
