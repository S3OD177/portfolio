export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t py-8">
      <div className="mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {year} Saud Albin Zaid. All rights reserved.</p>
        <p className="mt-1">Built with Next.js</p>
      </div>
    </footer>
  );
}
