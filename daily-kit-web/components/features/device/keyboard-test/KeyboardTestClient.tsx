"use client";

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { KeyState } from './KeyMap';
import VirtualKeyboard from './VirtualKeyboard';
import ChatteringTable from './ChatteringTable';
import { RotateCcw, AlertTriangle } from 'lucide-react';

export default function KeyboardTestClient() {
    const t = useTranslations('Tools.ScreenDevice.Keyboard');
    const [keyStates, setKeyStates] = useState<Record<string, KeyState>>({});
    const [history, setHistory] = useState<string[]>([]);
    const [chatterCount, setChatterCount] = useState(0);

    const CHATTER_THRESHOLD = 50; // ms

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        e.preventDefault();
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
    }, []);

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
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
                    <p className="text-[var(--text-sub)]">{t('description')}</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2 flex items-center gap-2">
                        <AlertTriangle size={20} className={chatterCount > 0 ? "text-red-500" : "text-gray-400"} />
                        <span className="font-mono font-bold">{chatterCount}</span>
                        <span className="text-sm text-[var(--text-sub)]">Chatters</span>
                    </div>
                    <button
                        onClick={resetTest}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded-xl hover:bg-[var(--card-hover)] transition-colors"
                    >
                        <RotateCcw size={18} />
                        {t('reset')}
                    </button>
                </div>
            </div>

            {/* Virtual Keyboard */}
            <VirtualKeyboard keyStates={keyStates} />

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
