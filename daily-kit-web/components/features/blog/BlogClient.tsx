"use client";

import { useTranslations } from 'next-intl';

export default function BlogClient() {
    const t = useTranslations('Blog');

    return (
        <div className="w-[calc(100%-3rem)] max-w-[1280px] mx-auto py-12">
            <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
            <div className="grid gap-6">
                <div className="p-6 border rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-2">Sample Post 1</h2>
                    <p className="text-gray-600">This is a sample blog post description.</p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-2">Sample Post 2</h2>
                    <p className="text-gray-600">This is another sample blog post description.</p>
                </div>
            </div>
        </div>
    );
}
