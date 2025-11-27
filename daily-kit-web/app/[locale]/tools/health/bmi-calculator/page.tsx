import { getTranslations } from 'next-intl/server';
import BmiCalculatorClient from './BmiCalculatorClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata.BmiCalculator' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function BmiCalculatorPage() {
    return <BmiCalculatorClient />;
}
