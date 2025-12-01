"use client";

export default function BlogPostClient({ slug }: { slug: string }) {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold mb-4">Blog Post: {slug}</h1>
            <div className="prose max-w-none">
                <p>This is the content for blog post: {slug}</p>
            </div>
        </div>
    );
}
