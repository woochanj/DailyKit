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
            <header className={`fixed top-0 left-0 right-0 h-[var(--header-height)] flex items-center px-5 md:px-10 bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(0,0,0,0.7)] backdrop-blur-[20px] border-b border-[var(--border)] z-[1000] transition-transform duration-300 ease-out ${isHidden ? '-translate-y-full' : ''}`}>
                <div className="w-full max-w-[1280px] mx-auto flex justify-between items-center h-full">
                    <Link href="/" className="flex items-center gap-2 no-underline transition-opacity duration-200 hover:opacity-70" aria-label="dailyKit Home">
                        <SquareTerminal size={26} strokeWidth={1.5} className="text-neutral-900 dark:text-white" />
                        <div className="flex items-center" style={{ fontFamily: 'var(--font-sans)' }}>
                            <span className="text-[22px] font-bold text-[var(--foreground)]">daily</span>
                            <span className="text-[22px] font-normal text-[var(--foreground)]">Kit</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-5 md:gap-8 items-center">
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

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-[var(--foreground)]"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open Menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[2000] bg-[var(--background)]/95 backdrop-blur-xl flex flex-col p-5 animate-in slide-in-from-right duration-300">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2">
                            <SquareTerminal size={26} strokeWidth={1.5} className="text-neutral-900 dark:text-white" />
                            <span className="text-[22px] font-bold text-[var(--foreground)]">dailyKit</span>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 text-[var(--foreground)]"
                            aria-label="Close Menu"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-6 text-lg font-medium">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-[var(--border)]">Home</Link>
                        <Link href="/tools" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-[var(--border)]">Tools</Link>
                        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-[var(--border)]">About</Link>
                    </nav>

                    <div className="mt-auto mb-8">
                        <h3 className="text-sm font-bold text-[var(--text-sub)] mb-4 uppercase tracking-wider">Language</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(languages).map(([code, label]) => (
                                <button
                                    key={code}
                                    onClick={() => handleLanguageChange(code)}
                                    className={`px-4 py-3 rounded-xl text-sm border transition-all ${locale === code
                                        ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]'
                                        : 'border-[var(--border)] text-[var(--foreground)]'
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
