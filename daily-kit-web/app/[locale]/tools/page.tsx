import { getTranslations } from 'next-intl/server';
import ToolsList from '@/components/features/tools/ToolsList';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Index' });

    return {
        title: t('allToolsTitle'),
        description: t('allToolsDesc'),
    };
}

export default function ToolsPage() {
    return <ToolsList />;
}
