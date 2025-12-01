import { getTranslations } from 'next-intl/server';
import DeveloperToolsList from '@/components/features/developer/DeveloperToolsList';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Index' });

    return {
        title: t('developerKitTitle'),
        description: t('developerKitDesc'),
    };
}

export default function DeveloperToolsPage() {
    return <DeveloperToolsList />;
}
