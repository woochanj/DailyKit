"use client";

import { useTranslations } from 'next-intl';

export default function ContactClient() {
    const t = useTranslations('Contact');

    return (
        <div className="container mx-auto py-12 px-4 max-w-2xl text-center">
            <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
                <p className="text-lg mb-6">{t('desc')}</p>
                <div className="inline-block bg-white dark:bg-black px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-800 font-mono">
                    {t('email')}
                </div>
            </div>
        </div>
    );
}
