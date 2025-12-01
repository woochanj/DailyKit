import { Link } from '@/i18n/routing';

export default function Footer() {
    return (
        <footer className="bg-transparent border-t border-[var(--border)] pt-20 px-5 pb-10 mt-auto md:pt-[60px] md:px-[20px] md:pb-[30px]">
            <div className="w-full max-w-[1024px] mx-auto flex flex-col items-center text-center">
                <div className="max-w-[500px] mb-12">
                    <h3 className="text-base font-semibold text-[var(--foreground)] mb-4 uppercase tracking-[0.05em]">DailyKit</h3>
                    <p className="text-sm text-[var(--text-sub)] leading-relaxed m-0">
                        Essential tools for developers and designers.
                        Simple, clean, and efficient utilities to boost your productivity.
                    </p>
                </div>

                <ul className="list-none p-0 m-0 mb-12 flex flex-wrap justify-center gap-8 md:gap-5 md:flex-col">
                    <li><Link href="/tools" className="text-[var(--text-sub)] no-underline text-sm transition-colors duration-200 hover:text-[var(--foreground)]">All Tools</Link></li>
                    <li><Link href="/about" className="text-[var(--text-sub)] no-underline text-sm transition-colors duration-200 hover:text-[var(--foreground)]">About Us</Link></li>
                    <li><Link href="/privacy" className="text-[var(--text-sub)] no-underline text-sm transition-colors duration-200 hover:text-[var(--foreground)]">Privacy Policy</Link></li>
                    <li><Link href="/terms" className="text-[var(--text-sub)] no-underline text-sm transition-colors duration-200 hover:text-[var(--foreground)]">Terms of Service</Link></li>
                    <li><Link href="/contact" className="text-[var(--text-sub)] no-underline text-sm transition-colors duration-200 hover:text-[var(--foreground)]">Contact Us</Link></li>
                </ul>

                <div className="text-center text-xs text-[var(--text-sub)] opacity-60">
                    Copyright © {new Date().getFullYear()} DailyKit. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
