"use client";

import { useTranslations } from 'next-intl';
import ToolGrid from '@/components/ui/ToolGrid';
import BentoCard from '@/components/ui/BentoCard';
import { Gamepad2, Keyboard, Mouse } from 'lucide-react';

export default function DeviceToolsList() {
    const t = useTranslations('Tools.Device');

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-16 text-center">
                <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">{t('title')}</h1>
                <p className="text-[var(--text-sub)] max-w-2xl mx-auto">{t('description')}</p>
            </div>

            <ToolGrid>
                <BentoCard
                    title={t('gamepadTestTitle')}
                    description={t('gamepadTestDesc')}
                    icon={<Gamepad2 size={32} />}
                    href="/tools/device/gamepad-tester"
                    className="w-full sm:w-[320px]"
                    color="88, 86, 214"
                />
                <BentoCard
                    title={t('keyboardTestTitle')}
                    description={t('keyboardTestDesc')}
                    icon={<Keyboard size={32} />}
                    href="/tools/device/keyboard-test"
                    className="w-full sm:w-[320px]"
                    color="0, 199, 190"
                />
                <BentoCard
                    title={t('mouseTestTitle')}
                    description={t('mouseTestDesc')}
                    icon={<Mouse size={32} />}
                    href="/tools/device/mouse-test"
                    className="w-full sm:w-[320px]"
                    color="255, 149, 0"
                />
            </ToolGrid>
        </div>
    );
}
