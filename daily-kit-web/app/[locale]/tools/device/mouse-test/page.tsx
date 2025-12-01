import { getTranslations } from 'next-intl/server';
import MouseTestClient from '@/components/features/device/mouse-test/MouseTestClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.ScreenDevice.Mouse' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function MouseTestPage() {
    return <MouseTestClient />;
}
