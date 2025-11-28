import { getTranslations } from 'next-intl/server';

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

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold mb-4">Blog Post: {slug}</h1>
            <div className="prose max-w-none">
                <p>This is the content for blog post: {slug}</p>
            </div>
        </div>
    );
}
