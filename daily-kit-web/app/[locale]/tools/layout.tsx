import Sidebar from '@/components/layout/Sidebar';

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row gap-8 pb-20 pt-8">
            <Sidebar />
            <div className="flex-1 min-w-0">
                {children}
            </div>
        </div>
    );
}
