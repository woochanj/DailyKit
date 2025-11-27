import { getTranslations } from 'next-intl/server';
import ScreenDeviceTestsClient from './ScreenDeviceTestsClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata.ScreenDeviceTests' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function ScreenDeviceTestsPage() {
    return <ScreenDeviceTestsClient />;
}
