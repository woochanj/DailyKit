import Sidebar from '@/components/layout/Sidebar';

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full px-5 md:px-10 pb-20">
            <div className="flex flex-col md:flex-row w-full max-w-[1280px] mx-auto gap-8">
                <Sidebar />
                <div className="flex-1 min-w-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
