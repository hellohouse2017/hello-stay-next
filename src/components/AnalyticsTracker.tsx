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

function inferSeoIntent(pathname: string) {
    if (pathname === '/kaohsiung-whole-house') return 'core_whole_house';
    if (pathname === '/compare') return 'compare';
    if (/^\/blog\/kaohsiung-(6|10|15|20|30)-person-stay$/.test(pathname)) return 'party_size';
    if (/kitchen|mahjong|family|arena/.test(pathname)) return 'feature';
    if (/hellohouse|godin/.test(pathname)) return 'brand';
    return pathname.startsWith('/blog/') || pathname.startsWith('/explore') ? 'inspiration' : 'brand';
}

function getConversionContext(anchor: HTMLAnchorElement, attribution: ReturnType<typeof getBookingAttributionContext>, destination: URL) {
    const guestCount = Number(destination.searchParams.get('guestCount') || anchor.dataset.partySize || 0) || undefined;
    const property = destination.searchParams.get('property') || anchor.dataset.propertySlug || '';
    return {
        source_page: window.location.pathname,
        seo_intent_group: anchor.dataset.seoIntent || inferSeoIntent(window.location.pathname),
        property_slug: property,
        party_size: guestCount,
        cta_type: anchor.dataset.ctaType || 'booking',
        cta_position: anchor.dataset.ctaPosition || 'content',
        destination: destination.pathname,
        site_session_id: attribution.siteSessionId,
        landing_path: attribution.landingPath,
        origin_path: attribution.originPath,
        acquisition_source: attribution.acquisitionSource,
        acquisition_medium: attribution.acquisitionMedium,
    };
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
                    ...getConversionContext(anchor, attribution, targetUrl),
                });
                return;
            }

            if (/lin\.ee|line\.me/.test(href)) {
                gtag('event', 'line_cta_click', {
                    event_category: 'conversion',
                    event_label: anchor.innerText.trim().slice(0, 80) || 'line',
                    location: window.location.pathname,
                    ...getConversionContext(anchor, attribution, new URL(href, window.location.origin)),
                });
            } else if (href.startsWith('tel:')) {
                gtag('event', 'phone_click', {
                    event_category: 'conversion',
                    event_label: href.replace('tel:', ''),
                    location: window.location.pathname,
                    ...getConversionContext(anchor, attribution, new URL(href, window.location.origin)),
                });
            } else if (href === '/book' || href.endsWith('/book') || /\/book(\?|$)/.test(href)) {
                gtag('event', 'book_click', {
                    event_category: 'conversion',
                    event_label: anchor.innerText.trim().slice(0, 80) || 'book',
                    location: window.location.pathname,
                    ...getConversionContext(anchor, attribution, new URL(href, window.location.origin)),
                });
            }
        };
        document.addEventListener('click', onClick, { capture: true });
        return () => document.removeEventListener('click', onClick, { capture: true });
    }, []);

    return null;
}
