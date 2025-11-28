"use client";

import BentoCard from "@/components/ui/BentoCard";
import { Monitor } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function ScreenDeviceTestsClient() {
    const t = useTranslations('Index');

    return (
        <div className="main-wrapper">
            <div className="mb-16 text-center animate-[fadeIn_0.5s_ease-out]">
                <h1 className="text-4xl font-bold mb-4">{t('screenDeviceTestsTitle')}</h1>
                <p className="subtitle max-w-2xl mx-auto">{t('screenDeviceTestsDesc')}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl">
                <BentoCard
                    title={t('displayTestTitle')}
                    description={t('displayTestDesc')}
                    icon={<Monitor size={28} />}
                    className="w-full md:w-[300px] h-[240px]"
                    href="/tools/screen-device-tests/display-test"
                />
            </div>
        </div>
    );
}
