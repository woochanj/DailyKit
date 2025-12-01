"use client";

import { useTranslations } from 'next-intl';
import { KeyState } from './KeyMap';

interface ChatteringTableProps {
    keyStates: Record<string, KeyState>;
}

export default function ChatteringTable({ keyStates }: ChatteringTableProps) {
    const t = useTranslations('Tools.ScreenDevice.Keyboard');

    // Filter keys that have been pressed at least once
    const activeKeys = Object.entries(keyStates)
        .filter(([_, state]) => state.count > 0)
        .map(([code, state]) => {
            // Calculate error rate (chatter count / total press count) - simplified logic for now
            // Since we don't track separate chatter count per key in the current state structure, 
            // we'll assume if chatteringDetected is true, it's a problematic key.
            // For a more advanced version, we might want to track specific chatter instances per key.
            return {
                code,
                ...state
            };
        })
        .sort((a, b) => {
            // Sort by: Chattering detected (true first) -> Press count (desc)
            if (a.chatteringDetected && !b.chatteringDetected) return -1;
            if (!a.chatteringDetected && b.chatteringDetected) return 1;
            return b.count - a.count;
        });

    if (activeKeys.length === 0) {
        return null;
    }

    return (
        <div className="w-full bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
            <div className="p-6 pb-4 bg-[var(--card)] z-10 relative">
                <h3 className="text-lg font-semibold">{t('statsTitle') || "Detailed Statistics"}</h3>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-[var(--text-sub)] border-b border-[var(--border)] sticky top-0 z-20">
                        <tr>
                            <th className="px-4 py-3 font-medium bg-[var(--card)]">Key Code</th>
                            <th className="px-4 py-3 font-medium text-right bg-[var(--card)]">Total Press</th>
                            <th className="px-4 py-3 font-medium text-center bg-[var(--card)]">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                        {activeKeys.map((key) => (
                            <tr key={key.code} className={key.chatteringDetected ? "bg-red-500/5" : ""}>
                                <td className={`px-4 py-3 font-mono ${key.chatteringDetected ? "text-red-500 font-bold" : "text-[var(--foreground)]"}`}>
                                    {key.code}
                                </td>
                                <td className="px-4 py-3 text-right font-mono">
                                    {key.count}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {key.chatteringDetected ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                                            {t('chattering') || "Chattering"}
                                        </span>
                                    ) : (
                                        <span className="text-[var(--text-sub)]">-</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
