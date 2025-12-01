import { getTranslations } from 'next-intl/server';
import HealthToolsList from '@/components/features/health/HealthToolsList';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Index' });

    return {
        title: t('healthLifeTitle'),
        description: t('healthLifeDesc'),
    };
}

export default function HealthToolsPage() {
    return <HealthToolsList />;
}
