import { getTranslations } from 'next-intl/server';
import JsonFormatterClient from './JsonFormatterClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata.JsonFormatter' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function JsonFormatterPage() {
    return <JsonFormatterClient />;
}
