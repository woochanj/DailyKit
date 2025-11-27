import { getTranslations } from 'next-intl/server';
import DevDataClient from './DevDataClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata.DevData' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function DevDataPage() {
    return <DevDataClient />;
}
