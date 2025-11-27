import { getTranslations } from 'next-intl/server';
import DeveloperToolsClient from './DeveloperToolsClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata.Developer' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function DeveloperToolsPage() {
    return <DeveloperToolsClient />;
}
