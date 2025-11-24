import BentoCard from "@/components/BentoCard";
import AdUnit from "@/components/AdUnit";
import {
  Timer,
  QrCode,
  FileJson
} from "lucide-react";

export default function Home() {
  return (
    <div className="main-wrapper">
      <div className="mb-16 text-center animate-[fadeIn_0.5s_ease-out]">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-4">
          DailyKit
        </h1>
        <p className="subtitle max-w-2xl mx-auto">
          A collection of essential tools for developers and designers.
          Simple, clean, and efficient.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl">
        {/* Main Feature: Unit Converter (Wide) */}
        {/* JSON Formatter */}
        <BentoCard
          title="Display Test"
          description="Test Dead pixel, color, and brightness, etc."
          icon={<FileJson size={28} />}
          className="w-full md:w-[300px] h-[240px]"
          href="/tools/display-test"
        />


        {/* JSON Formatter */}
        <BentoCard
          title="JSON Formatter"
          description="Validate JSON data."
          icon={<FileJson size={28} />}
          className="w-full md:w-[300px] h-[240px]"
          href="/tools/json"
        />


        {/* AdSense Placeholder (Wide) */}
        <AdUnit
          slotId="1234567890"
          className="w-full md:w-[624px] h-[240px] !m-0 !max-w-none !bg-white !border !border-gray-100 !rounded-[2rem]"
          label="Sponsored"
        />
      </div>
    </div>
  );
}
