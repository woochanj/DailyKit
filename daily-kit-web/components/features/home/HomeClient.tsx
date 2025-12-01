"use client";

import BentoCard from "@/components/ui/BentoCard";
import AdUnit from "@/components/ui/AdUnit";
import {
    Timer,
    FileJson,
    Monitor,
    BookOpen,
    Gamepad2
} from "lucide-react";
import { useTranslations } from 'next-intl';

export default function HomeClient() {
    const t = useTranslations('Index');

    return (
        <div className="w-full max-w-[1024px] px-5 py-10 text-center flex-1 flex flex-col items-center mx-auto">
            <div className="mb-16 text-center animate-[fadeIn_0.5s_ease-out]">
                <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-4">
                    DailyKit
                </h1>
                <p className="text-[20px] text-[var(--text-sub)] font-normal mb-10 break-keep leading-relaxed max-w-2xl mx-auto">
                    {t('greeting')}
                </p>
            </div>

            {/* Category Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-[1024px] mx-auto mb-12">
                {/* Dev & Data */}
                <BentoCard
                    title={t('devDataTitle')}
                    description={t('devDataDesc')}
                    icon={<FileJson size={32} strokeWidth={1} />}
                    href="/tools/dev-data"
                />

                {/* Screen Tests */}
                <BentoCard
                    title={t('screenTestsTitle')}
                    description={t('screenTestsDesc')}
                    icon={<Monitor size={64} strokeWidth={0.8} />}
                    href="/tools/screen"
                />

                {/* Device Tests */}
                <BentoCard
                    title={t('deviceTestsTitle')}
                    description={t('deviceTestsDesc')}
                    icon={<Gamepad2 size={64} strokeWidth={0.8} />}
                    href="/tools/device"
                />

                {/* Health & Life */}
                {/* <BentoCard
                    title={t('healthLifeTitle')}
                    description={t('healthLifeDesc')}
                    icon={<Timer size={32} strokeWidth={1} />} // Using Timer as placeholder icon for Health
                    href="/tools/health"
                /> */}

                {/* Blog */}
                <BentoCard
                    title={t('blogTitle')}
                    description={t('blogDesc')}
                    icon={<BookOpen size={32} strokeWidth={1} />}
                    href="/blog"
                />

                {/* AdSense Placeholder (Wide) */}
                <AdUnit
                    slotId="1234567890"
                    className="!m-0 !max-w-none !bg-transparent !border !border-gray-200 !rounded-[1.5rem] !shadow-none min-h-[240px] flex flex-col justify-center items-center"
                    label="Sponsored"
                />
            </div>

            {/* Most Popular Tools Section */}
            <div className="w-full max-w-5xl text-left mb-8 mt-20">
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
