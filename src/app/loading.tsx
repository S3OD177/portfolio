export default function Loading() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Navbar skeleton */}
      <div className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-4">
          <div className="h-5 w-32 animate-pulse rounded bg-muted" />
        </div>
      </div>

      {/* Hero skeleton */}
      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <div className="h-12 w-64 animate-pulse rounded bg-muted" />
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="flex gap-4 pt-4">
          <div className="h-10 w-32 animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-32 animate-pulse rounded-md bg-muted" />
        </div>
      </section>

      {/* Content skeleton */}
      <section className="mx-auto max-w-5xl space-y-8 px-4 py-20">
        <div className="mx-auto h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
        </div>
      </section>
    </div>
  );
}
