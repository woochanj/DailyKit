import { useTranslations } from 'next-intl';
import ToolGrid from '@/components/ui/ToolGrid';
import BentoCard from '@/components/ui/BentoCard';
import { Monitor, FileJson, Timer, BookOpen } from 'lucide-react';

export default function ToolsPage() {
    const t = useTranslations('Index');

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">All Tools</h1>
                <p className="text-[var(--text-sub)]">Explore our collection of useful utilities.</p>
            </div>

            <ToolGrid>
                <BentoCard
                    title={t('screenDeviceTestsTitle')}
                    description={t('screenDeviceTestsDesc')}
                    icon={<Monitor size={32} />}
                    href="/tools/screen-device-tests"
                />
                <BentoCard
                    title={t('devDataTitle')}
                    description={t('devDataDesc')}
                    icon={<FileJson size={32} />}
                    href="/tools/dev-data"
                />
                <BentoCard
                    title={t('healthLifeTitle')}
                    description={t('healthLifeDesc')}
                    icon={<Timer size={32} />}
                    href="/tools/health"
                />
                <BentoCard
                    title={t('blogTitle')}
                    description={t('blogDesc')}
                    icon={<BookOpen size={32} />}
                    href="/blog"
                />
            </ToolGrid>
        </div>
    );
}
