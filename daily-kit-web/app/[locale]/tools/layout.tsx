import Sidebar from '@/components/layout/Sidebar';

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex justify-center pb-20">
            <div className="flex flex-col md:flex-row w-[calc(100%-3rem)] max-w-[1280px] gap-8">
                <Sidebar />
                <div className="flex-1 min-w-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
