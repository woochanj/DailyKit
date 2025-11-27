"use client";

import { useTranslations } from 'next-intl';

export default function BmiCalculatorClient() {
    // const t = useTranslations('Health'); // TODO: Add Health namespace
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-3xl font-bold mb-4">BMI Calculator</h1>
            <p className="text-gray-600">Calculate your Body Mass Index.</p>
            <p className="mt-8 text-sm text-gray-400">Coming Soon...</p>
        </div>
    );
}
