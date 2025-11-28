'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';

const languages = {
    en: 'English',
    ko: '한국어',
    es: 'Español',
    fr: 'Français',
    jp: '日本語',
    cn: '中文'
};

export default function Header() {
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = (newLang: string) => {
        router.replace(pathname, { locale: newLang });
        setIsDropdownOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
        <header className={`fixed top-0 left-0 right-0 h-[var(--header-height)] flex items-center px-5 md:px-10 bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(0,0,0,0.7)] backdrop-blur-[20px] border-b border-[var(--border)] z-[1000] transition-transform duration-300 ease-out ${isHidden ? '-translate-y-full' : ''}`}>
            <div className="w-full max-w-[1024px] mx-auto flex justify-between items-center h-full">
                <Link href="/" className="flex items-center no-underline transition-opacity duration-200 hover:opacity-70" aria-label="dailyKit Home">
                    <svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Wireframe Style: Stroke only, no fill */}
                        <rect x="1" y="1" width="38" height="38" rx="12" stroke="var(--foreground)" strokeWidth="2" fill="none" />
                        <path d="M12 20L18 26L28 14" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                        <g style={{ fill: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}>
                            <text x="52" y="28" fontSize="22" fontWeight="700">daily</text>
                            <text x="102" y="28" fontSize="22" fontWeight="400">Kit</text>
                        </g>
                    </svg>
                </Link>
                <nav className="flex gap-5 md:gap-8 items-center">
                    <Link href="/" className={`no-underline text-[var(--text-main)] text-[13px] md:text-sm font-medium uppercase tracking-[0.05em] transition-colors duration-200 relative hover:opacity-70 ${pathname === '/' ? 'after:content-[""] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--foreground)]' : ''}`}>Home</Link>
                    <Link href="/tools" className={`no-underline text-[var(--text-main)] text-[13px] md:text-sm font-medium uppercase tracking-[0.05em] transition-colors duration-200 relative hover:opacity-70 ${pathname.startsWith('/tools') ? 'after:content-[""] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--foreground)]' : ''}`}>Tools</Link>
                    <Link href="/about" className={`no-underline text-[var(--text-main)] text-[13px] md:text-sm font-medium uppercase tracking-[0.05em] transition-colors duration-200 relative hover:opacity-70 ${pathname === '/about' ? 'after:content-[""] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--foreground)]' : ''}`}>About</Link>

                    {/* Custom Language Dropdown */}
                    <div className="relative ml-4" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center justify-center gap-2 w-32 py-2 rounded-lg hover:bg-[var(--background)]/50 hover:opacity-70 transition-all duration-200 group"
                            aria-label="Select Language"
                        >
                            <Globe size={18} className="text-[var(--text-main)] transition-colors" strokeWidth={1.5} />
                            <span className="text-sm font-medium text-[var(--text-main)] uppercase tracking-wider transition-colors">
                                {languages[locale as keyof typeof languages]}
                            </span>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-32 py-2 rounded-2xl border border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                {Object.entries(languages).map(([code, label]) => (
                                    <button
                                        key={code}
                                        onClick={() => handleLanguageChange(code)}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${locale === code
                                            ? 'font-bold text-[var(--foreground)] bg-[var(--foreground)]/5'
                                            : 'text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5'
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
