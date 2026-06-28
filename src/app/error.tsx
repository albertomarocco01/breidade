"use client";

// Route-level error boundary (App Router). Error boundaries MUST be Client
// Components. NOTE: in this Next build the boundary receives `unstable_retry`
// (NOT the older `reset`) — see node_modules/next/dist/docs error-handling guide.
// Copy is English (the source language and the site default); errors are a rare
// edge path, so this page is intentionally not locale-switched.
import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Surface the error for diagnostics (swap for a reporting service later).
    console.error(error);
  }, [error]);

  return (
    <div className="section" data-section="about">
      <section className="container state" aria-labelledby="err-title">
        <span className="state-code" aria-hidden="true">
          !
        </span>
        <div className="state-inner">
          <h1 id="err-title" className="state-title hand">
            Something went wrong
          </h1>
          <p className="state-body">
            An unexpected error occurred. You can try again, or head back to the
            gate.
          </p>
          <div className="state-actions">
            <button
              type="button"
              className="state-home"
              onClick={() => unstable_retry()}
            >
              try again
            </button>
            <Link href="/" className="state-home">
              ← back to home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
