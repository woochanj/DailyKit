'use client';

import { useState, useEffect, useRef } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Globe, SquareTerminal, Menu, X } from 'lucide-react';

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = (newLang: string) => {
        router.replace(pathname, { locale: newLang });
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
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

            if (currentScrollY > lastScrollY && currentScrollY > 60 && !isMobileMenuOpen) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        const handleFullscreenChange = () => {
            if (document.fullscreenElement) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, [lastScrollY, isMobileMenuOpen]);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-[1000] flex justify-center pt-4 transition-transform duration-300 ease-out pointer-events-none ${isHidden ? '-translate-y-full' : ''}`}>
                <div className="w-[calc(100%-3rem)] max-w-[1280px] h-[var(--header-height)] flex justify-between items-center px-6 rounded-2xl bg-[var(--background)]/80 backdrop-blur-md pointer-events-auto">
                    <Link href="/" className="flex items-center gap-2 no-underline transition-opacity duration-200 hover:opacity-70" aria-label="dailyKit Home">
                        <SquareTerminal size={26} strokeWidth={1.5} className="text-neutral-900 dark:text-white" />
                        <div className="flex items-center" style={{ fontFamily: 'var(--font-sans)' }}>
                            <span className="text-[22px] font-bold text-[var(--foreground)]">daily</span>
                            <span className="text-[22px] font-normal text-[var(--foreground)]">Kit</span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        {/* Menu Button (Desktop & Mobile) */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="flex items-center gap-2 px-5 py-1.5 rounded-full text-[var(--foreground)] text-sm font-medium hover:bg-[var(--foreground)]/5 transition-all duration-300"
                        >
                            MENU
                        </button>

                        {/* Language Switcher */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="p-2 rounded-full text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-all duration-300"
                                aria-label="Select Language"
                            >
                                <Globe size={20} strokeWidth={1.5} />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-32 py-2 rounded-2xl border border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md shadow-sm flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
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
                    </div>
                </div>
            </header>

            {/* Full Screen Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[2000] bg-[var(--background)]/95 backdrop-blur-xl animate-in fade-in duration-200">
                    <div className="w-[calc(100%-3rem)] max-w-[1280px] mx-auto mt-4 flex flex-col h-[calc(100%-2rem)]">
                        {/* Header Part of Overlay */}
                        <div className="h-[var(--header-height)] flex justify-between items-center px-6 rounded-2xl border border-[var(--border)] bg-[var(--background)]">
                            {/* Logo */}
                            <div className="flex items-center gap-2">
                                <SquareTerminal size={26} strokeWidth={1.5} className="text-neutral-900 dark:text-white" />
                                <span className="text-[22px] font-bold text-[var(--foreground)]">dailyKit</span>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-sm font-medium uppercase tracking-wider hover:opacity-50 transition-opacity"
                            >
                                Close
                            </button>

                            {/* Placeholder for balance */}
                            <div className="w-[26px]"></div>
                        </div>

                        {/* Menu Grid */}
                        <nav className="flex-1 overflow-y-auto py-4 no-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center py-6 border border-[var(--border)] rounded-2xl text-sm font-medium uppercase tracking-widest hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all">Home</Link>
                                <Link href="/tools" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center py-6 border border-[var(--border)] rounded-2xl text-sm font-medium uppercase tracking-widest hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all">Tools</Link>
                                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center py-6 border border-[var(--border)] rounded-2xl text-sm font-medium uppercase tracking-widest hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all">About</Link>
                                <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center py-6 border border-[var(--border)] rounded-2xl text-sm font-medium uppercase tracking-widest hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all">Blog</Link>
                                <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center py-6 border border-[var(--border)] rounded-2xl text-sm font-medium uppercase tracking-widest hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all">Projects</Link>
                                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center py-6 border border-[var(--border)] rounded-2xl text-sm font-medium uppercase tracking-widest hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all">Contact</Link>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
