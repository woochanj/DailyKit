"use client";

import { useState, useEffect } from "react";
import { Monitor, Grid3x3 } from "lucide-react";

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

export default function DisplayTestPage() {
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

    const enterFullscreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if ((elem as any).webkitRequestFullscreen) {
            (elem as any).webkitRequestFullscreen();
        }
    };

    const exitFullscreen = () => {
        if (document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen();
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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Main Content */}
            {testMode === "idle" && (
                <div className="main-wrapper">
                    <div className="mb-16 text-center animate-[fadeIn_0.5s_ease-out]">
                        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-4">
                            Display Test
                        </h1>
                        <p className="subtitle max-w-2xl mx-auto">
                            Check for dead pixels and backlight bleeding on your screen.
                            <br />
                            Test your monitor's contrast and color accuracy.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 max-w-md mx-auto">
                        {/* Dead Pixel Test Card */}
                        <button
                            onClick={startDeadPixelTest}
                            className="group relative flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Monitor size={24} />
                            </div>
                            <div className="text-left flex-1">
                                <h3 className="font-semibold text-lg text-gray-900">Dead Pixel Test</h3>
                                <p className="text-sm text-gray-500">Cycle through solid colors</p>
                            </div>
                        </button>

                        {/* Contrast Test Card */}
                        <button
                            onClick={startContrastTest}
                            className="group relative flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-gray-700 group-hover:text-white transition-colors">
                                <Grid3x3 size={24} />
                            </div>
                            <div className="text-left flex-1">
                                <h3 className="font-semibold text-lg text-gray-900">Contrast Test</h3>
                                <p className="text-sm text-gray-500">Grayscale gradient levels</p>
                            </div>
                        </button>
                    </div>

                    <p className="mt-12 text-sm text-gray-400 text-center mb-20">
                        💡 Tests enter fullscreen mode. Click or press Space to cycle through colors.
                    </p>

                    {/* SEO Content Section */}
                    <div className="max-w-3xl mx-auto text-left space-y-12 pb-20">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Test Your Display?</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Whether you've just bought a new monitor, laptop, or smartphone, or you're troubleshooting an old one,
                                verifying your screen's health is crucial. Manufacturing defects like dead pixels or backlight bleeding
                                can affect your viewing experience. Our <strong>Display Test</strong> tool helps you identify these issues quickly and easily
                                directly from your browser, with no software installation required.
                            </p>
                        </section>

                        <div className="grid md:grid-cols-2 gap-8">
                            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    Dead vs. Stuck Pixels
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    <strong>Dead Pixels</strong> are pixels that fail to light up, appearing as black dots on a bright background.
                                    They are usually permanent hardware faults.
                                    <br /><br />
                                    <strong>Stuck Pixels</strong> are pixels frozen in a specific color (Red, Green, or Blue).
                                    Unlike dead pixels, stuck pixels can sometimes be fixed by rapidly flashing colors over the area,
                                    which forces the liquid crystal to reset.
                                </p>
                            </section>

                            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    Backlight Bleeding
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Backlight bleeding occurs when light from the monitor's backlight leaks around the edges of the screen.
                                    It is most visible when viewing dark scenes in a dimly lit room.
                                    Use our <strong>Black Screen Test</strong> (the first color in the cycle) to check for uneven brightness
                                    along the bezels of your display.
                                </p>
                            </section>
                        </div>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use This Tool</h2>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 leading-relaxed ml-4">
                                <li><strong>Dead Pixel Test:</strong> Cycles through solid primary colors (Red, Green, Blue, White, Black). Look for any tiny dots that don't match the background color.</li>
                                <li><strong>Contrast Test:</strong> Displays a grayscale gradient. A good monitor should allow you to distinguish between each step of the gradient, especially the darkest and lightest ends.</li>
                                <li><strong>Fullscreen Mode:</strong> For the most accurate results, the tests automatically enter fullscreen mode to remove browser distractions.</li>
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
                        Click or press Space to continue • ESC to exit
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
                        Click or press ESC to exit
                    </div>
                </div>
            )}
        </div>
    );
}
