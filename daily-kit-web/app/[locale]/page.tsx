import { getTranslations } from 'next-intl/server';
import HomeClient from '@/components/features/home/HomeClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata.Index' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function Home() {
    return <HomeClient />;
}
