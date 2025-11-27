"use client";

import { useTranslations } from 'next-intl';

export default function JsonFormatterClient() {
    const t = useTranslations('Index');
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-3xl font-bold mb-4">{t('jsonFormatterTitle')}</h1>
            <p className="text-gray-600">{t('jsonFormatterDesc')}</p>
            <p className="mt-8 text-sm text-gray-400">Coming Soon...</p>
        </div>
    );
}
