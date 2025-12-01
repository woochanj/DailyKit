"use client";

import { useState, useEffect, useRef } from "react";
import { Monitor, Grid3x3 } from "lucide-react";
import { useTranslations } from 'next-intl';

type TestMode = "idle" | "dead-pixel" | "contrast";

const PIXEL_COLORS = [
    "black",
    "white",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "yellow",
    "magenta",
    "cyan",
    "#808080",
];

export default function DisplayTestClient() {
    const t = useTranslations('DisplayTest');
    const [testMode, setTestMode] = useState<TestMode>("idle");
    const [colorIndex, setColorIndex] = useState(0);

    const startDeadPixelTest = () => {
        setColorIndex(0);
        setTestMode("dead-pixel");
        enterFullscreen();
    };

    const startContrastTest = () => {
        setTestMode("contrast");
        enterFullscreen();
    };

    const nextColor = () => {
        if (colorIndex < PIXEL_COLORS.length - 1) {
            setColorIndex(colorIndex + 1);
        } else {
            endTest();
        }
    };

    const endTest = () => {
        setTestMode("idle");
        setColorIndex(0);
        exitFullscreen();
    };

    const containerRef = useRef<HTMLDivElement>(null);

    const enterFullscreen = () => {
        const elem = containerRef.current;
        if (!elem) return;

        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch((err: any) => {
                console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
            });
        } else if ((elem as any).webkitRequestFullscreen) {
            (elem as any).webkitRequestFullscreen();
        }
    };

    const exitFullscreen = () => {
        if (document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen().catch((err: any) => {
                console.error(`Error attempting to exit fullscreen: ${err.message} (${err.name})`);
            });
        }
    };

    // Generate contrast bars
    const contrastBars = [];
    for (let i = 0; i <= 100; i += 4) {
        const grayLevel = Math.round((i / 100) * 255);
        contrastBars.push({ percent: i, color: `rgb(${grayLevel}, ${grayLevel}, ${grayLevel})` });
    }

    // Listen for fullscreen changes (e.g., user presses ESC)
    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && testMode !== "idle") {
                // User exited fullscreen (e.g., pressed ESC) - end the test
                setTestMode("idle");
                setColorIndex(0);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (testMode === "dead-pixel") {
                if (e.code === "Space") {
                    e.preventDefault();
                    // Use functional update to ensure we have the latest state if needed, 
                    // but since we are in useEffect with dependencies, we can just call nextColor logic directly or use a ref.
                    // However, nextColor function is recreated on render, so we can just call it if we include it in deps.
                    // But simpler to just replicate logic here to avoid complex deps.
                    setColorIndex(prev => {
                        if (prev < PIXEL_COLORS.length - 1) return prev + 1;
                        // If we are at the end, we need to end the test. 
                        // But we can't call endTest() easily inside setState.
                        // So let's use a different approach or just use the function.
                        return prev;
                    });

                    // Actually, let's just use the state from closure since we will add dependencies
                    if (colorIndex < PIXEL_COLORS.length - 1) {
                        setColorIndex(colorIndex + 1);
                    } else {
                        endTest();
                    }
                } else if (e.code === "Escape") {
                    e.preventDefault();
                    endTest();
                }
            } else if (testMode === "contrast") {
                if (e.code === "Escape") {
                    e.preventDefault();
                    endTest();
                }
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [testMode, colorIndex]); // Added colorIndex dependency

    return (
        <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Main Content */}
            {testMode === "idle" && (
                <div className="main-wrapper">
                    <div className="mb-16 text-center animate-[fadeIn_0.5s_ease-out]">
                        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl mb-4">
                            {t('title')}
                        </h1>
                        <p className="subtitle max-w-2xl mx-auto whitespace-pre-line">
                            {t('description')}
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 max-w-md mx-auto">
                        {/* Dead Pixel Test Card */}
                        <button
                            onClick={startDeadPixelTest}
                            className="group relative flex items-center gap-4 p-6 bg-transparent rounded-3xl border border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-gray-100 transition-all duration-300"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-gray-900 dark:text-gray-100 group-hover:scale-110 transition-transform">
                                <Monitor size={32} strokeWidth={1} />
                            </div>
                            <div className="text-left flex-1">
                                <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">{t('deadPixelTitle')}</h3>
                                <p className="text-sm text-gray-500">{t('deadPixelDesc')}</p>
                            </div>
                        </button>

                        {/* Contrast Test Card */}
                        <button
                            onClick={startContrastTest}
                            className="group relative flex items-center gap-4 p-6 bg-transparent rounded-3xl border border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-gray-100 transition-all duration-300"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-gray-900 dark:text-gray-100 group-hover:scale-110 transition-transform">
                                <Grid3x3 size={32} strokeWidth={1} />
                            </div>
                            <div className="text-left flex-1">
                                <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">{t('contrastTitle')}</h3>
                                <p className="text-sm text-gray-500">{t('contrastDesc')}</p>
                            </div>
                        </button>
                    </div>

                    <p className="mt-12 text-sm text-gray-400 text-center mb-20">
                        {t('instruction')}
                    </p>

                    {/* SEO Content Section */}
                    <div className="max-w-3xl mx-auto text-left space-y-12 pb-20">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('whyTestTitle')}</h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {t.rich('whyTestDesc', {
                                    b: (chunks) => <strong className="text-gray-900 dark:text-gray-100">{chunks}</strong>
                                })}
                            </p>
                        </section>

                        <div className="grid md:grid-cols-2 gap-8">
                            <section className="bg-transparent p-6 rounded-3xl border border-gray-200 dark:border-gray-800">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    {t('deadVsStuckTitle')}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                                    {t.rich('deadVsStuckDesc', {
                                        b: (chunks) => <strong className="text-gray-900 dark:text-gray-100">{chunks}</strong>
                                    })}
                                </p>
                            </section>

                            <section className="bg-transparent p-6 rounded-3xl border border-gray-200 dark:border-gray-800">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    {t('backlightTitle')}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {t.rich('backlightDesc', {
                                        b: (chunks) => <strong className="text-gray-900 dark:text-gray-100">{chunks}</strong>
                                    })}
                                </p>
                            </section>
                        </div>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('howToUseTitle')}</h2>
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 leading-relaxed ml-4">
                                <li>
                                    {t.rich('howToDeadPixel', {
                                        b: (chunks) => <strong className="text-gray-900 dark:text-gray-100">{chunks}</strong>
                                    })}
                                </li>
                                <li>
                                    {t.rich('howToContrast', {
                                        b: (chunks) => <strong className="text-gray-900 dark:text-gray-100">{chunks}</strong>
                                    })}
                                </li>
                                <li>
                                    {t.rich('howToFullscreen', {
                                        b: (chunks) => <strong className="text-gray-900 dark:text-gray-100">{chunks}</strong>
                                    })}
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            )}

            {/* Dead Pixel Test Layer */}
            {testMode === "dead-pixel" && (
                <div
                    className="fixed inset-0 z-50 cursor-pointer"
                    style={{ backgroundColor: PIXEL_COLORS[colorIndex] }}
                    onClick={nextColor}
                    // onKeyDown handler removed as it is now handled globally
                    tabIndex={0}
                >
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 text-sm">
                        {t('clickToContinue')}
                    </div>
                </div>
            )}

            {/* Contrast Test Layer */}
            {testMode === "contrast" && (
                <div
                    className="fixed inset-0 z-50 overflow-auto cursor-pointer"
                    onClick={endTest}
                >
                    <div className="flex h-full">
                        {contrastBars.map((bar, idx) => (
                            <div
                                key={idx}
                                className="flex-1 relative flex items-center justify-center"
                                style={{ backgroundColor: bar.color }}
                            >
                                <span
                                    className="text-xs font-mono opacity-50"
                                    style={{ color: bar.percent > 50 ? "#000" : "#fff" }}
                                >
                                    {bar.percent}%
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm">
                        {t('clickToExit')}
                    </div>
                </div>
            )}
        </div>
    );
}
