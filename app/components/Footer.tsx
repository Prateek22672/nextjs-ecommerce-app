// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-black h-20 flex flex-col items-center justify-center px-4 text-center">
      <p className="text-sm text-gray-800">
        © {new Date().getFullYear()} Prateek™ — Concept Based.
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Built with Next.js (App Router), React, TypeScript, Tailwind CSS, API Routes,
        SSG, ISR (revalidate), SSR, Client Components, and JSON/MongoDB data.
      </p>
    </footer>
  );
}
