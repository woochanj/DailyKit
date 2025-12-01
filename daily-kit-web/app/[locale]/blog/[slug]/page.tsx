import { getTranslations } from 'next-intl/server';
import BlogPostClient from '@/components/features/blog/BlogPostClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: 'Blog' });

    return {
        title: `${t('title')} - ${slug}`,
        description: t('description'),
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { slug } = await params;
    return <BlogPostClient slug={slug} />;
}
