"use client";

import { useTranslations } from 'next-intl';

export default function PrivacyClient() {
    const t = useTranslations('Privacy');

    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
            <div className="prose dark:prose-invert max-w-none space-y-8">
                <p className="text-sm text-gray-500">{t('lastUpdated')}</p>

                <section>
                    <p>{t('intro')}</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">{t('logFilesTitle')}</h2>
                    <p>{t('logFilesDesc')}</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">{t('cookiesTitle')}</h2>
                    <p>{t('cookiesDesc')}</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">{t('googleTitle')}</h2>
                    <p>{t('googleDesc')}</p>
                </section>
            </div>
        </div>
    );
}
