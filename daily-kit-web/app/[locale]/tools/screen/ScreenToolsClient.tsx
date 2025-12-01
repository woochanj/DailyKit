"use client";

import { useTranslations } from 'next-intl';
import ToolGrid from '@/components/ui/ToolGrid';
import BentoCard from '@/components/ui/BentoCard';
import { Monitor } from 'lucide-react';

export default function ScreenToolsClient() {
    const t = useTranslations('Tools.Screen');

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-16 text-center">
                <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">{t('title')}</h1>
                <p className="text-[var(--text-sub)] max-w-2xl mx-auto">{t('description')}</p>
            </div>

            <ToolGrid>
                <BentoCard
                    title={t('displayTestTitle')}
                    description={t('displayTestDesc')}
                    icon={<Monitor size={32} />}
                    href="/tools/screen/display-test"
                    className="w-full sm:w-[320px]"
                />
            </ToolGrid>
        </div>
    );
}
