"use client";

import { useTranslations } from 'next-intl';
import ToolGrid from '@/components/ui/ToolGrid';
import BentoCard from '@/components/ui/BentoCard';
import { Monitor, FileJson, Timer, BookOpen, Gamepad2 } from 'lucide-react';

export default function ToolsClient() {
    const t = useTranslations('Index');

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-16 text-center">
                <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">{t('allToolsTitle')}</h1>
                <p className="text-[var(--text-sub)] max-w-2xl mx-auto">{t('allToolsDesc')}</p>
            </div>

            <ToolGrid>
                <BentoCard
                    title={t('screenTestsTitle')}
                    description={t('screenTestsDesc')}
                    icon={<Monitor size={32} />}
                    href="/tools/screen"
                    className="w-full sm:w-[320px]"
                />
                <BentoCard
                    title={t('deviceTestsTitle')}
                    description={t('deviceTestsDesc')}
                    icon={<Gamepad2 size={32} />}
                    href="/tools/device"
                    className="w-full sm:w-[320px]"
                />
                <BentoCard
                    title={t('devDataTitle')}
                    description={t('devDataDesc')}
                    icon={<FileJson size={32} />}
                    href="/tools/dev-data"
                    className="w-full sm:w-[320px]"
                />
                {/* <BentoCard
                    title={t('healthLifeTitle')}
                    description={t('healthLifeDesc')}
                    icon={<Timer size={32} />}
                    href="/tools/health"
                /> */}

                <BentoCard
                    title={t('blogTitle')}
                    description={t('blogDesc')}
                    icon={<BookOpen size={32} />}
                    href="/blog"
                    className="w-full sm:w-[320px]"
                />
            </ToolGrid>
        </div>
    );
}
