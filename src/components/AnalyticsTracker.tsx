'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { decorateBookingHref, getBookingAttributionContext, isBookingHref } from '@/lib/booking-attribution';
import { GA4_MEASUREMENT_ID } from '@/lib/analytics-config';
import { AI_ASSISTANT_MEDIUM, AI_ASSISTANT_REFERRER_ALLOWLIST } from '@/lib/ai-assistant-referrers';

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        dataLayer?: unknown[];
        __helloStayGa4ConfigQueued?: boolean;
    }
}

function getGa4Config() {
    const config: Record<string, unknown> = { send_page_view: false };
    const referrer = document.referrer;
    if (!referrer) return config;

    try {
        const hostname = new URL(referrer).hostname.replace(/^www\./, '');
        const matched = AI_ASSISTANT_REFERRER_ALLOWLIST.some((host) => hostname === host || hostname.endsWith(`.${host}`));
        if (matched) {
            config.campaign_medium = AI_ASSISTANT_MEDIUM;
            config.campaign_source = hostname;
        }
    } catch {
        // A malformed referrer must not prevent analytics initialization.
    }
    return config;
}

function ensureGa4() {
    const win = window;
    const dataLayer = win.dataLayer || (win.dataLayer = []);

    if (typeof win.gtag !== 'function') {
        win.gtag = (...args: unknown[]) => {
            dataLayer.push(args);
        };
    }

    const hasConfig = dataLayer.some((entry) => {
        if (!entry || typeof entry !== 'object' || !('length' in entry)) return false;
        const values = Array.from(entry as ArrayLike<unknown>);
        return values[0] === 'config' && values[1] === GA4_MEASUREMENT_ID;
    });

    if (!hasConfig && !win.__helloStayGa4ConfigQueued) {
        win.gtag('config', GA4_MEASUREMENT_ID, getGa4Config());
    }
    win.__helloStayGa4ConfigQueued = true;
    return win.gtag;
}

export default function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        const sendPageView = () => {
            const gtag = ensureGa4();
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
            const gtag = ensureGa4();
            const attribution = getBookingAttributionContext();
            const contentBridgeId = anchor.dataset.contentBridge;

            if (contentBridgeId) {
                const destination = new URL(href, window.location.origin);
                gtag('event', 'content_bridge_click', {
                    event_category: 'engagement',
                    event_label: anchor.innerText.trim().slice(0, 80) || destination.pathname,
                    bridge_id: contentBridgeId,
                    bridge_target: anchor.dataset.contentBridgeTarget || destination.pathname,
                    source_path: window.location.pathname,
                    destination_path: destination.pathname,
                });
            }

            if (isBookingHref(href)) {
                const decoratedHref = decorateBookingHref(href, attribution);
                anchor.href = decoratedHref;
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
                return;
            }

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
