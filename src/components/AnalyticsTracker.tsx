'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

export default function AnalyticsTracker() {
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;
            const anchor = target.closest('a') as HTMLAnchorElement | null;
            if (!anchor) return;
            const href = anchor.getAttribute('href') || '';
            const gtag = window.gtag;
            if (typeof gtag !== 'function') return;

            if (/lin\.ee|line\.me/.test(href)) {
                gtag('event', 'line_cta_click', {
                    event_category: 'conversion',
                    event_label: anchor.innerText.trim().slice(0, 80) || 'line',
                    location: window.location.pathname,
                });
            } else if (href.startsWith('tel:')) {
                gtag('event', 'phone_click', {
                    event_category: 'conversion',
                    event_label: href.replace('tel:', ''),
                    location: window.location.pathname,
                });
            } else if (href === '/book' || href.endsWith('/book') || /\/book(\?|$)/.test(href)) {
                gtag('event', 'book_click', {
                    event_category: 'conversion',
                    event_label: anchor.innerText.trim().slice(0, 80) || 'book',
                    location: window.location.pathname,
                });
            }
        };
        document.addEventListener('click', onClick, { capture: true });
        return () => document.removeEventListener('click', onClick, { capture: true });
    }, []);

    return null;
}
