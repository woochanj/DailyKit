"use client";

import BentoCard from "@/components/BentoCard";
import AdUnit from "@/components/AdUnit";
import {
    Timer,
    FileJson,
    Monitor
} from "lucide-react";
import { useTranslations } from 'next-intl';

export default function HomeClient() {
    const t = useTranslations('Index');

    return (
        <div className="main-wrapper">
            <div className="mb-16 text-center animate-[fadeIn_0.5s_ease-out]">
                <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-4">
                    DailyKit
                </h1>
                <p className="subtitle max-w-2xl mx-auto">
                    {t('greeting')}
                </p>
            </div>

            {/* Category Cards */}
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl mb-12">
                {/* Dev & Data */}
                <BentoCard
                    title={t('devDataTitle')}
                    description={t('devDataDesc')}
                    icon={<FileJson size={28} />}
                    className="w-full md:w-[300px] h-[240px]"
                    href="/tools/dev-data"
                />

                {/* Screen & Device Tests */}
                <BentoCard
                    title={t('screenDeviceTestsTitle')}
                    description={t('screenDeviceTestsDesc')}
                    icon={<Monitor size={28} />}
                    className="w-full md:w-[300px] h-[240px]"
                    href="/tools/screen-device-tests"
                />

                {/* Health & Life */}
                <BentoCard
                    title={t('healthLifeTitle')}
                    description={t('healthLifeDesc')}
                    icon={<Timer size={28} />} // Using Timer as placeholder icon for Health
                    className="w-full md:w-[300px] h-[240px]"
                    href="/tools/health"
                />

                {/* AdSense Placeholder (Wide) */}
                <AdUnit
                    slotId="1234567890"
                    className="w-full md:w-[300px] h-[240px] !m-0 !max-w-none !bg-white !border !border-gray-100 !rounded-[2rem]"
                    label="Sponsored"
                />
            </div>

            {/* Most Popular Tools Section */}
            <div className="w-full max-w-5xl text-left mb-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    🔥 {t('popularToolsTitle')}
                </h2>
                <div className="flex flex-wrap gap-4">
                    <BentoCard
                        title={t('displayTestTitle')}
                        description={t('displayTestDesc')}
                        icon={<FileJson size={24} />}
                        className="w-full md:w-[240px] h-[180px]"
                        href="/tools/screen-device-tests/display-test"
                    />
                </div>
            </div>
        </div>
    );
}
