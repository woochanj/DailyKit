import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.ScreenDevice.Keyboard' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function KeyboardTestPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.ScreenDevice.Keyboard' });

    return (
        <div className="container mx-auto py-12 text-center">
            <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
            <p className="text-xl text-gray-600">Coming Soon</p>
        </div>
    );
}
