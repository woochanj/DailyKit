'use client';

import { Link } from '@/i18n/routing';
import { usePathname } from '@/i18n/routing';
import { LayoutGrid, Monitor, Code, Heart, BookOpen, Gamepad2 } from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { href: '/tools', label: 'All Tools', icon: LayoutGrid, exact: true },
        { href: '/tools/screen', label: 'Screen', icon: Monitor },
        { href: '/tools/device', label: 'Device', icon: Gamepad2 },
        { href: '/tools/developer', label: 'Developer', icon: Code },
        // { href: '/tools/health', label: 'Health & Life', icon: Heart },
        { href: '/blog', label: 'Blog', icon: BookOpen },
    ];

    const toolItems = navItems.filter(item => item.href !== '/blog');
    const blogItem = navItems.find(item => item.href === '/blog');

    return (
        <aside className="w-full md:w-64 flex-shrink-0 flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto md:sticky md:top-[calc(var(--header-height)+2rem)] md:h-[calc(100vh-var(--header-height)-4rem)] gap-2 pb-2 md:pb-0 scrollbar-hide md:pl-6">
            <nav className="flex flex-row md:flex-col gap-2 h-full w-full">
                <div className="flex flex-row md:flex-col gap-2">
                    {toolItems.map((item) => {
                        const isActive = item.exact
                            ? pathname === item.href
                            : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group flex-shrink-0 whitespace-nowrap ${isActive
                                    ? 'bg-[var(--foreground)] text-[var(--background)]'
                                    : 'text-[var(--text-sub)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5'
                                    }`}
                            >
                                <item.icon size={20} strokeWidth={1.5} />
                                <span className="font-medium text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className="hidden md:block w-full h-px bg-[var(--border)] my-2 opacity-50" />
                <div className="md:hidden w-px h-full bg-[var(--border)] mx-2 opacity-50" />

                {blogItem && (
                    <Link
                        href={blogItem.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-sub)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-all flex-shrink-0 whitespace-nowrap"
                    >
                        <BookOpen size={20} strokeWidth={1.5} />
                        <span className="font-medium text-sm">Read Blog</span>
                        <span className="hidden md:inline ml-auto text-xs opacity-50">↗</span>
                    </Link>
                )}
            </nav>
        </aside>
    );
}
