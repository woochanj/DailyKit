import { getTranslations } from 'next-intl/server';
import BlogClient from '@/components/features/blog/BlogClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Blog' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function BlogPage() {
    return <BlogClient />;
}
