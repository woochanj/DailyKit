'use client';

import { useEffect } from 'react';

interface AdUnitProps {
    slotId: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    className?: string;
    label?: string;
}

export default function AdUnit({
    slotId,
    format = 'auto',
    className = '',
    label = 'Advertisement',
}: AdUnitProps) {
    const isDev = process.env.NODE_ENV === 'development';

    useEffect(() => {
        if (!isDev) {
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                console.error('AdSense error:', err);
            }
        }
    }, [isDev]);

    if (isDev) {
        return (
            <div
                className={`ad-slot ${className}`}
            >
                <span className="text-xs font-medium uppercase tracking-wider opacity-70">
                    {label}
                </span>
            </div>
        );
    }

    return (
        <div className={`ad-slot overflow-hidden ${className}`}>
            <ins
                className="adsbygoogle block"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Placeholder Client ID
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
        </div>
    );
}
