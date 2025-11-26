'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';

export default function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLang = locale === 'en' ? 'ko' : 'en';
    router.replace(pathname, { locale: newLang });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    const handleFullscreenChange = () => {
      // If there is a fullscreen element, hide the header immediately
      if (document.fullscreenElement) {
        setIsHidden(true);
      } else {
        // When exiting fullscreen, restore visibility based on scroll
        setIsHidden(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [lastScrollY]);

  return (
    <header className={`header ${isHidden ? 'header-hidden' : ''}`}>
      <div className="header-content">
        <Link href="/" className="logo" aria-label="dailyKit Home">
          <svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="12" style={{ fill: 'var(--primary)' }} />
            <path d="M12 20L18 26L28 14" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

            <g style={{ fill: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}>
              <text x="52" y="28" fontSize="22" fontWeight="700">daily</text>
              <text x="102" y="28" fontSize="22" fontWeight="400">Kit</text>
            </g>
          </svg>
        </Link>
        <nav className="nav-menu">
          <Link href="/" className={`nav-item ${pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link href="/tools" className={`nav-item ${pathname.startsWith('/tools') ? 'active' : ''}`}>Tools</Link>
          <Link href="/about" className={`nav-item ${pathname === '/about' ? 'active' : ''}`}>About</Link>

          <button
            className="nav-item flex items-center gap-1 ml-2 px-2 py-1 rounded-full hover:bg-gray-100 transition-colors"
            onClick={toggleLanguage}
            aria-label="Switch Language"
          >
            <Globe size={18} />
            <span className="text-sm font-medium">{locale.toUpperCase()}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
