'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { decorateBookingHref, getBookingAttributionContext, isBookingHref } from '@/lib/booking-attribution';

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

export default function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        const sendPageView = () => {
            const gtag = window.gtag;
            if (typeof gtag !== 'function') return false;
            gtag('event', 'page_view', {
                page_location: window.location.href,
                page_path: `${window.location.pathname}${window.location.search}`,
                page_title: document.title,
            });
            return true;
        };

        if (sendPageView()) return;
        const timer = window.setTimeout(sendPageView, 500);
        return () => window.clearTimeout(timer);
    }, [pathname]);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;
            const anchor = target.closest('a') as HTMLAnchorElement | null;
            if (!anchor) return;
            const href = anchor.getAttribute('href') || '';
            const gtag = window.gtag;
            const attribution = getBookingAttributionContext();

            if (isBookingHref(href)) {
                const decoratedHref = decorateBookingHref(href, attribution);
                anchor.href = decoratedHref;
                if (typeof gtag === 'function') {
                    const targetUrl = new URL(decoratedHref);
                    gtag('event', 'book_click', {
                        event_category: 'conversion',
                        event_label: anchor.innerText.trim().slice(0, 80) || 'book',
                        location: window.location.pathname,
                        property: targetUrl.searchParams.get('property') || '',
                        guest_count: Number(targetUrl.searchParams.get('guestCount') || 0) || undefined,
                        site_session_id: attribution.siteSessionId,
                        landing_path: attribution.landingPath,
                        origin_path: attribution.originPath,
                        acquisition_source: attribution.acquisitionSource,
                        acquisition_medium: attribution.acquisitionMedium,
                    });
                }
                return;
            }

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
                    site_session_id: attribution.siteSessionId,
                    landing_path: attribution.landingPath,
                    origin_path: attribution.originPath,
                });
            }
        };
        document.addEventListener('click', onClick, { capture: true });
        return () => document.removeEventListener('click', onClick, { capture: true });
    }, []);

    return null;
}
