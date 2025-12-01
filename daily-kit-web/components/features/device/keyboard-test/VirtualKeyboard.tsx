"use client";

import { KEYBOARD_LAYOUT, KeyState } from './KeyMap';

interface VirtualKeyboardProps {
    keyStates: Record<string, KeyState>;
}

export default function VirtualKeyboard({ keyStates }: VirtualKeyboardProps) {
    return (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 mb-8 overflow-x-auto">
            <div className="min-w-[800px] flex flex-col gap-2">
                {KEYBOARD_LAYOUT.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2 justify-center">
                        {row.map((key) => {
                            const state = keyStates[key.code];
                            const isPressed = state?.pressed;
                            const hasHistory = state?.count > 0;
                            const isChattering = state?.chatteringDetected;

                            let bgClass = "bg-[var(--bg)]";
                            if (isChattering) bgClass = "bg-red-500/20 border-red-500";
                            else if (isPressed) bgClass = "bg-blue-500 text-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]";
                            else if (hasHistory) bgClass = "bg-blue-500/10 border-blue-500/50 text-blue-500";

                            return (
                                <div
                                    key={key.code}
                                    className={`
                                        relative flex items-center justify-center rounded-xl border transition-all duration-75 select-none
                                        ${bgClass}
                                        ${!isPressed && !hasHistory && !isChattering ? "border-[var(--border)] text-[var(--text-sub)]" : ""}
                                    `}
                                    style={{
                                        width: `${(key.width || 1) * 60}px`,
                                        height: '60px'
                                    }}
                                >
                                    <span className="font-medium text-sm">{key.label}</span>
                                    {state?.count > 0 && (
                                        <span className="absolute top-1 right-2 text-[10px] opacity-60">
                                            {state.count}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
