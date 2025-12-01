import { getTranslations } from 'next-intl/server';
import DisplayTestClient from '@/components/features/display-test/DisplayTestClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata.DisplayTest' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function DisplayTestPage() {
    return <DisplayTestClient />;
}
