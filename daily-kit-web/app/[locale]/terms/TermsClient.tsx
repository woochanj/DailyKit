"use client";

import { useTranslations } from 'next-intl';

export default function TermsClient() {
    const t = useTranslations('Terms');

    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
            <div className="prose dark:prose-invert max-w-none space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">{t('intro')}</h2>
                    <p>{t('desc')}</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">{t('licenseTitle')}</h2>
                    <p>{t('licenseDesc')}</p>
                </section>
            </div>
        </div>
    );
}
