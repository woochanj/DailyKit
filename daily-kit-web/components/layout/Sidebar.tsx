'use client';

import { Link } from '@/i18n/routing';
import { usePathname } from '@/i18n/routing';
import { LayoutGrid, Monitor, Code, Heart, BookOpen } from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { href: '/tools', label: 'All Tools', icon: LayoutGrid, exact: true },
        { href: '/tools/screen-device-tests', label: 'Screen & Device', icon: Monitor },
        { href: '/tools/developer', label: 'Developer', icon: Code },
        { href: '/tools/health', label: 'Health & Life', icon: Heart },
        { href: '/blog', label: 'Blog', icon: BookOpen },
    ];

    return (
        <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-[calc(var(--header-height)+2rem)] md:h-[calc(100vh-var(--header-height)-4rem)] overflow-y-auto">
            <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                    const isActive = item.exact
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-[var(--foreground)] text-[var(--background)]'
                                : 'text-[var(--text-sub)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5'
                                }`}
                        >
                            <item.icon size={20} strokeWidth={1.5} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
