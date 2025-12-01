import { getTranslations } from 'next-intl/server';
import DevDataList from '@/components/features/dev-data/DevDataList';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Index' });

    return {
        title: t('devDataTitle'),
        description: t('devDataDesc'),
    };
}

export default function DevDataPage() {
    return <DevDataList />;
}
