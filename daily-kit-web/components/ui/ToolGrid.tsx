export default function ToolGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-wrap justify-center gap-6 max-w-[1400px] mx-auto">
            {children}
        </div>
    );
}
