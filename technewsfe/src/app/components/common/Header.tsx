// src/app/components/common/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm hidden md:block">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex primary-font justify-between items-center h-16">
          <nav className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 space-x-8">
            <Link href="/tech" className="text-neutral-600 primary-font hover:text-primary-600 transition">Technology</Link>
            <Link href="/science" className="text-neutral-600 hover:text-primary-600 transition">Science</Link>
            <Link href="/culture" className="text-neutral-600 hover:text-primary-600 transition">Culture</Link>
            <Link href="/about" className="text-neutral-600 hover:text-primary-600 transition">About</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}