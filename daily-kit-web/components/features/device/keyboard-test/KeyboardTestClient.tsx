"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { KeyState } from './KeyMap';
import VirtualKeyboard, { KeyboardLayoutType } from './VirtualKeyboard';
import ChatteringTable from './ChatteringTable';
import { RotateCcw, AlertTriangle, Keyboard as KeyboardIcon, Zap, Volume2, VolumeX } from 'lucide-react';

export default function KeyboardTestClient() {
    const t = useTranslations('Tools.ScreenDevice.Keyboard');
    const [keyStates, setKeyStates] = useState<Record<string, KeyState>>({});
    const [history, setHistory] = useState<string[]>([]);
    const [chatterCount, setChatterCount] = useState(0);
    const [layout, setLayout] = useState<KeyboardLayoutType>('full');

    // New Features State
    const [maxRollover, setMaxRollover] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const CHATTER_THRESHOLD = 50; // ms

    // Initialize Audio
    useEffect(() => {
        audioRef.current = new Audio('/sounds/click.mp3');
        audioRef.current.volume = 0.3;
    }, []);

    const playSound = useCallback(() => {
        if (!isMuted && audioRef.current) {
            // Clone node to allow overlapping sounds for fast typing
            const sound = audioRef.current.cloneNode() as HTMLAudioElement;
            sound.volume = 0.2;
            sound.play().catch(() => { }); // Ignore auto-play errors
        }
    }, [isMuted]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        // Allow typing in the playground textarea
        const isTextarea = e.target instanceof HTMLTextAreaElement;
        if (!isTextarea) {
            e.preventDefault();
        }

        playSound();

        const code = e.code;
        const now = Date.now();

        setKeyStates(prev => {
            const current = prev[code] || { pressed: false, count: 0, lastPressed: 0, chatteringDetected: false };

            // Chattering detection
            let isChattering = false;
            if (!current.pressed && (now - current.lastPressed < CHATTER_THRESHOLD)) {
                isChattering = true;
                setChatterCount(c => c + 1);
            }

            return {
                ...prev,
                [code]: {
                    pressed: true,
                    count: current.count + 1,
                    lastPressed: now,
                    chatteringDetected: current.chatteringDetected || isChattering
                }
            };
        });

        setHistory(prev => [code, ...prev].slice(0, 20));
    }, [playSound]);

    const handleKeyUp = useCallback((e: KeyboardEvent) => {
        e.preventDefault();
        const code = e.code;

        setKeyStates(prev => ({
            ...prev,
            [code]: {
                ...prev[code],
                pressed: false
            }
        }));
    }, []);

    // Track Max Rollover (NKRO)
    useEffect(() => {
        const currentPressed = Object.values(keyStates).filter(k => k.pressed).length;
        if (currentPressed > maxRollover) {
            setMaxRollover(currentPressed);
        }
    }, [keyStates, maxRollover]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    const resetTest = () => {
        setKeyStates({});
        setHistory([]);
        setChatterCount(0);
        setMaxRollover(0);
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
                    <p className="text-[var(--text-sub)]">{t('description')}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    {/* NKRO Badge */}
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2 flex items-center gap-2">
                        <Zap size={20} className="text-yellow-500" fill="currentColor" />
                        <span className="font-mono font-bold">{maxRollover}</span>
                        <span className="text-sm text-[var(--text-sub)]">Max Keys</span>
                    </div>

                    {/* Chatter Badge */}
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2 flex items-center gap-2">
                        <AlertTriangle size={20} className={chatterCount > 0 ? "text-red-500" : "text-gray-400"} />
                        <span className="font-mono font-bold">{chatterCount}</span>
                        <span className="text-sm text-[var(--text-sub)]">Chatters</span>
                    </div>

                    {/* Sound Toggle */}
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="flex items-center justify-center w-10 h-10 bg-[var(--card)] border border-[var(--border)] rounded-xl hover:bg-[var(--foreground)]/5 hover:text-[var(--foreground)] transition-colors"
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <VolumeX size={20} className="text-gray-400" /> : <Volume2 size={20} className="text-blue-500" />}
                    </button>

                    {/* Reset Button */}
                    <button
                        onClick={resetTest}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded-xl hover:bg-[var(--foreground)]/5 hover:text-[var(--foreground)] transition-colors"
                    >
                        <RotateCcw size={18} />
                        {t('reset')}
                    </button>
                </div>
            </div>

            {/* Layout Switcher */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {(['full', 'tkl', '75%', '60%'] as const).map((l) => (
                    <button
                        key={l}
                        onClick={() => setLayout(l)}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-xl border transition-all whitespace-nowrap
                            ${layout === l
                                ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/20"
                                : "bg-[var(--card)] border-[var(--border)] text-[var(--text-sub)] hover:bg-[var(--foreground)]/5 hover:text-[var(--foreground)]"
                            }
                        `}
                    >
                        <KeyboardIcon size={16} />
                        <span className="font-medium">
                            {l === 'full' ? 'Full Size' : l === 'tkl' ? 'TKL (87)' : l === '75%' ? '75%' : '60% (Mini)'}
                        </span>
                    </button>
                ))}
            </div>

            {/* Typing Playground */}
            <div className="mb-8">
                <textarea
                    className="w-full h-24 bg-transparent border border-[var(--border)] rounded-xl p-4 text-lg font-sans placeholder:text-[var(--text-sub)]/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                    placeholder="Type here to test input (Hangul/English)..."
                    spellCheck={false}
                />
            </div>

            {/* Virtual Keyboard */}
            <VirtualKeyboard keyStates={keyStates} layout={layout} />

            {/* Input History (Restored) */}
            {history.length > 0 && (
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h3 className="text-lg font-semibold mb-4">Input History</h3>
                    <div className="flex flex-wrap gap-2 font-mono text-sm text-[var(--text-sub)]">
                        {history.map((code, i) => (
                            <span key={i} className="bg-[var(--bg)] px-2 py-1 rounded border border-[var(--border)] animate-in fade-in zoom-in duration-200">
                                {code}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Ad Placeholder (Golden Zone) */}
            <div className="w-full bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 mb-8 flex flex-col items-center justify-center min-h-[120px]">
                <p className="text-xs font-mono text-[var(--text-sub)] mb-2">SPONSORED</p>
                <div className="w-full max-w-[728px] h-[90px] bg-[var(--bg)] rounded-lg border border-dashed border-[var(--border)] flex items-center justify-center text-[var(--text-sub)]">
                    AdSense Leaderboard (728x90)
                </div>
            </div>

            {/* Chattering Stats Table */}
            <ChatteringTable keyStates={keyStates} />
        </div>
    );
}
