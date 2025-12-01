"use client";

import BentoCard from "@/components/ui/BentoCard";
import { Timer } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function HealthToolsList() {
    const t = useTranslations('Index');

    return (
        <div className="main-wrapper">
            <div className="mb-16 text-center animate-[fadeIn_0.5s_ease-out]">
                <h1 className="text-4xl font-bold mb-4">{t('healthLifeTitle')}</h1>
                <p className="subtitle max-w-2xl mx-auto">{t('healthLifeDesc')}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl">
                <BentoCard
                    title="BMI Calculator"
                    description="Calculate your Body Mass Index."
                    icon={<Timer size={28} />}
                    className="w-full md:w-[300px] h-[240px]"
                    href="/tools/health/bmi-calculator"
                />
            </div>
        </div>
    );
}
