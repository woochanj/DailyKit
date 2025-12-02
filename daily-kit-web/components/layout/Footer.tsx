import { Link } from '@/i18n/routing';
import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full flex justify-center pb-8 mt-20">
            <div className="w-[calc(100%-3rem)] max-w-[1280px] flex flex-col items-center text-center px-6 py-12 rounded-2xl bg-[var(--background)]">

                {/* Links */}
                <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm font-medium text-[var(--text-main)]">
                    <Link href="/about" className="hover:text-[var(--foreground)] transition-colors">About</Link>
                    <Link href="/tools" className="hover:text-[var(--foreground)] transition-colors">Tools</Link>
                    <Link href="/blog" className="hover:text-[var(--foreground)] transition-colors">Blog</Link>
                    <a href="https://github.com/woochanj/DailyKit" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">GitHub</a>
                </div>

                {/* Social Icons */}
                <div className="flex gap-6 mb-8 text-[var(--text-sub)]">
                    <a href="https://github.com/woochanj" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">
                        <Github size={20} strokeWidth={1.5} />
                    </a>
                    <a href="#" className="hover:text-[var(--foreground)] transition-colors">
                        <Twitter size={20} strokeWidth={1.5} />
                    </a>
                    <a href="mailto:contact@dailykit.com" className="hover:text-[var(--foreground)] transition-colors">
                        <Mail size={20} strokeWidth={1.5} />
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-sm text-[var(--text-sub)] opacity-60">
                    &copy; {new Date().getFullYear()} dailyKit. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
