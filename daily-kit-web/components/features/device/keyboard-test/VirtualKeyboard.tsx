"use client";

import { useRef, useState, useEffect } from 'react';
import { KeyData, KeyState, F_ROW_MAIN, F_ROW_NAV, MAIN_BLOCK, NAV_BLOCK, NUM_BLOCK, F_BLOCK_75, MAIN_BLOCK_75, NAV_COLUMN_75 } from './KeyMap';

export type KeyboardLayoutType = 'full' | 'tkl' | '60%' | '75%';

interface VirtualKeyboardProps {
    keyStates: Record<string, KeyState>;
    layout?: KeyboardLayoutType;
}

export default function VirtualKeyboard({ keyStates, layout = 'full' }: VirtualKeyboardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            if (!containerRef.current) return;
            const containerWidth = containerRef.current.offsetWidth;

            let contentWidth = 1400; // Default for Full (approx 1360px + padding)
            if (layout === 'tkl') contentWidth = 1150;
            if (layout === '75%') contentWidth = 1050;
            if (layout === '60%') contentWidth = 950;

            // Add some padding
            const availableWidth = containerWidth - 32;
            const newScale = Math.min(1, availableWidth / contentWidth);
            setScale(newScale);
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, [layout]);

    const renderBlock = (block: KeyData[][], blockName: string) => (
        <div className={`flex flex-col gap-1 ${blockName}`}>
            {block.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1">
                    {row.map((key) => {
                        if (key.code === 'GAP') {
                            return <div key={`${rowIndex}-${key.width}`} style={{ width: `${(key.width || 1) * 60}px`, height: '60px' }} />;
                        }

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
                                    relative flex items-center justify-center rounded-[4px] border transition-all duration-75 select-none
                                    ${bgClass}
                                    ${!isPressed && !hasHistory && !isChattering ? "border-[var(--border)] text-[var(--text-sub)]" : ""}
                                `}
                                style={{
                                    width: `${(key.width || 1) * 60}px`,
                                    height: `${(key.height || 1) * 60}px`
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
    );

    const renderNumpad = () => {
        // Flatten the 2D array since we're using CSS Grid
        const flatKeys = NUM_BLOCK.flat();

        return (
            <div className="grid grid-cols-4 gap-1 num-block" style={{ width: `${4 * 60 + 3 * 4}px` }}>
                {flatKeys.map((key) => {
                    const state = keyStates[key.code];
                    const isPressed = state?.pressed;
                    const hasHistory = state?.count > 0;
                    const isChattering = state?.chatteringDetected;

                    let bgClass = "bg-[var(--bg)]";
                    if (isChattering) bgClass = "bg-red-500/20 border-red-500";
                    else if (isPressed) bgClass = "bg-blue-500 text-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]";
                    else if (hasHistory) bgClass = "bg-blue-500/10 border-blue-500/50 text-blue-500";

                    const colSpan = key.width === 2 ? 'col-span-2' : 'col-span-1';
                    const rowSpan = key.height === 2 ? 'row-span-2' : 'row-span-1';

                    return (
                        <div
                            key={key.code}
                            className={`
                                relative flex items-center justify-center rounded-[4px] border transition-all duration-75 select-none
                                ${bgClass}
                                ${!isPressed && !hasHistory && !isChattering ? "border-[var(--border)] text-[var(--text-sub)]" : ""}
                                ${colSpan} ${rowSpan}
                            `}
                            style={{
                                width: '100%',
                                height: '100%',
                                minHeight: '60px'
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
        );
    };

    return (
        <div ref={containerRef} className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 mb-8 overflow-hidden flex justify-center">
            <div
                className="origin-top transition-transform duration-200 ease-out"
                style={{
                    transform: `scale(${scale})`,
                    width: 'fit-content',
                    marginBottom: `-${(1 - scale) * 300}px`
                }}
            >
                {layout === '60%' && (
                    <div className="flex justify-center">
                        {renderBlock(MAIN_BLOCK, 'main-block')}
                    </div>
                )}

                {layout === '75%' && (
                    <div className="flex flex-col gap-1">
                        {/* 75% Layout: Compact F-Row, then Main+Nav */}
                        <div className="flex gap-1">
                            {renderBlock(F_BLOCK_75, 'f-block-75')}
                        </div>
                        <div className="flex gap-1">
                            {renderBlock(MAIN_BLOCK_75, 'main-block-75')}
                            <div className="flex flex-col gap-1">
                                {renderBlock(NAV_COLUMN_75, 'nav-column-75')}
                            </div>
                        </div>
                    </div>
                )}

                {layout === 'tkl' && (
                    <div className="flex flex-col gap-4">
                        {/* Top Row: F-Keys + Nav Cluster Top */}
                        <div className="flex gap-4">
                            {renderBlock(F_ROW_MAIN, 'f-row-main')}
                            {renderBlock(F_ROW_NAV, 'f-row-nav')}
                        </div>

                        {/* Main + Nav */}
                        <div className="flex gap-4">
                            {renderBlock(MAIN_BLOCK, 'main-block')}
                            {renderBlock(NAV_BLOCK, 'nav-block')}
                        </div>
                    </div>
                )}

                {layout === 'full' && (
                    <div className="flex flex-col gap-4">
                        {/* Top Row: F-Keys + Nav Cluster Top */}
                        <div className="flex gap-4">
                            {renderBlock(F_ROW_MAIN, 'f-row-main')}
                            {renderBlock(F_ROW_NAV, 'f-row-nav')}
                            {/* Spacer for Numpad alignment if needed, or just empty */}
                            <div style={{ width: `${4 * 60}px` }}></div>
                        </div>

                        {/* Bottom Row: Main + Nav + Num */}
                        <div className="flex gap-4">
                            {renderBlock(MAIN_BLOCK, 'main-block')}
                            {renderBlock(NAV_BLOCK, 'nav-block')}
                            {renderNumpad()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
