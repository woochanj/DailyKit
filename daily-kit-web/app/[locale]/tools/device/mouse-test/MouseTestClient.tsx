"use client";

import { useTranslations } from 'next-intl';

export default function MouseTestClient() {
    const t = useTranslations('Tools.ScreenDevice.Mouse');

    return (
        <div className="container mx-auto py-12 text-center">
            <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
            <p className="text-xl text-gray-600">Coming Soon</p>
        </div>
    );
}
