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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    }, [lastScrollY]);

    const menuItems = [
        { href: '/', label: 'Home' },
        { href: '/tools', label: 'Tools' },
        { href: '/about', label: 'About' },
        { href: '/blog', label: 'Blog' },
        { href: '/projects', label: 'Projects' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-[1000] flex justify-center pt-4 transition-transform duration-300 ease-out pointer-events-none ${isHidden ? '-translate-y-full' : ''}`}>
            <div className="w-[calc(100%-3rem)] max-w-[1280px] h-[var(--header-height)] flex justify-between items-center px-6 rounded-2xl bg-[var(--background)]/80 backdrop-blur-md pointer-events-auto border-b border-[var(--border)]">
                <Link href="/" className="flex items-center gap-2 no-underline transition-opacity duration-200 hover:opacity-70" aria-label="dailyKit Home">
                    <SquareTerminal size={26} strokeWidth={1.5} className="text-neutral-900 dark:text-white" />
                    <div className="flex items-center" style={{ fontFamily: 'var(--font-sans)' }}>
                        <span className="text-[22px] font-bold text-[var(--foreground)]">daily</span>
                        <span className="text-[22px] font-normal text-[var(--foreground)]">Kit</span>
                    </div>
                </Link>

                <div className="flex items-center gap-4">
                    {/* Menu Button (Hover Dropdown) */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsMenuOpen(true)}
                        onMouseLeave={() => setIsMenuOpen(false)}
                    >
                        <button
                            className="flex items-center gap-2 px-5 py-1.5 rounded-full text-[var(--foreground)] text-sm font-medium hover:bg-[var(--foreground)]/5 transition-all duration-300"
                        >
                            MENU
                        </button>

                        {/* Menu Dropdown */}
                        {isMenuOpen && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 py-2 rounded-2xl bg-[var(--background)]/70 backdrop-blur-xl backdrop-saturate-150 shadow-sm flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200 before:absolute before:-top-2 before:left-0 before:w-full before:h-2 before:content-['']">
                                <div className="absolute inset-0 rounded-2xl border border-[var(--border)] pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_50%)]" />
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="w-full text-left px-4 py-2 text-sm text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-colors relative z-10"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Language Switcher */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="px-5 py-1.5 rounded-full text-[var(--foreground)] text-sm font-medium hover:bg-[var(--foreground)]/5 transition-all duration-300 uppercase"
                            aria-label="Select Language"
                        >
                            {languages[locale as keyof typeof languages]}
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-32 py-2 rounded-2xl bg-[var(--background)]/70 backdrop-blur-xl backdrop-saturate-150 shadow-sm flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="absolute inset-0 rounded-2xl border border-[var(--border)] pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_50%)]" />
                                {Object.entries(languages).map(([code, label]) => (
                                    <button
                                        key={code}
                                        onClick={() => handleLanguageChange(code)}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors relative z-10 ${locale === code
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
    );
}
