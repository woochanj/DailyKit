import { getTranslations } from 'next-intl/server';
import KeyboardTestClient from '@/components/features/device/keyboard-test/KeyboardTestClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Tools.ScreenDevice.Keyboard' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function KeyboardTestPage() {
    return <KeyboardTestClient />;
}
