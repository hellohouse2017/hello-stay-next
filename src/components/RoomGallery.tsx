'use client';

import Image from 'next/image';
import { useState, useRef, useCallback, useEffect } from 'react';
import type { RoomImage } from '@/data/properties';

interface RoomGalleryProps {
    images: RoomImage[];
    roomName: string;
}

export default function RoomGallery({ images, roomName }: RoomGalleryProps) {
    const [current, setCurrent] = useState(0);
    const [lightbox, setLightbox] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const startX = useRef(0);
    const isDragging = useRef(false);

    const total = images.length;

    const goTo = useCallback((idx: number) => {
        setCurrent(Math.max(0, Math.min(idx, total - 1)));
    }, [total]);

    const prev = useCallback(() => goTo(current - 1), [current, goTo]);
    const next = useCallback(() => goTo(current + 1), [current, goTo]);

    // Touch/swipe handling
    const onTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
        isDragging.current = true;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const diff = startX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? next() : prev();
        }
    };

    // Keyboard for lightbox
    useEffect(() => {
        if (!lightbox) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightbox(false);
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handler);
            document.body.style.overflow = '';
        };
    }, [lightbox, prev, next]);

    if (total <= 1) {
        return (
            <div className="room-gallery-single" onClick={() => total > 0 && setLightbox(true)}>
                <Image
                    src={images[0]?.src || ''}
                    alt={images[0]?.alt || roomName}
                    width={700}
                    height={500}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="img-cover"
                    style={{ cursor: 'zoom-in' }}
                />
                {lightbox && (
                    <Lightbox images={images} current={current} onClose={() => setLightbox(false)}
                        onPrev={prev} onNext={next} goTo={goTo} />
                )}
            </div>
        );
    }

    return (
        <>
            <div className="room-gallery"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                <div className="room-gallery-track" ref={trackRef}
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {images.map((img, i) => (
                        <div key={i} className="room-gallery-slide"
                            onClick={() => setLightbox(true)}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                width={700}
                                height={500}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="img-cover"
                                loading={i === 0 ? undefined : 'lazy'}
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation arrows */}
                {current > 0 && (
                    <button className="room-gallery-arrow room-gallery-arrow-left"
                        onClick={(e) => { e.stopPropagation(); prev(); }}
                        aria-label="上一張照片"
                    >‹</button>
                )}
                {current < total - 1 && (
                    <button className="room-gallery-arrow room-gallery-arrow-right"
                        onClick={(e) => { e.stopPropagation(); next(); }}
                        aria-label="下一張照片"
                    >›</button>
                )}

                {/* Counter + dots */}
                <div className="room-gallery-counter">
                    <span>{current + 1} / {total}</span>
                </div>
                <div className="room-gallery-dots">
                    {images.map((_, i) => (
                        <button key={i}
                            className={`room-gallery-dot ${i === current ? 'active' : ''}`}
                            onClick={(e) => { e.stopPropagation(); goTo(i); }}
                            aria-label={`第 ${i + 1} 張照片`}
                        />
                    ))}
                </div>
            </div>

            {lightbox && (
                <Lightbox images={images} current={current} onClose={() => setLightbox(false)}
                    onPrev={prev} onNext={next} goTo={goTo} />
            )}
        </>
    );
}

// ── Lightbox overlay ──
function Lightbox({ images, current, onClose, onPrev, onNext, goTo }: {
    images: RoomImage[];
    current: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
    goTo: (i: number) => void;
}) {
    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <button className="lightbox-close" onClick={onClose} aria-label="關閉">✕</button>

                <div className="lightbox-main">
                    {current > 0 && (
                        <button className="lightbox-arrow lightbox-arrow-left" onClick={onPrev}>‹</button>
                    )}
                    <div className="lightbox-image-wrap">
                        <Image
                            src={images[current].src}
                            alt={images[current].alt}
                            width={1200}
                            height={800}
                            sizes="90vw"
                            quality={90}
                            className="lightbox-image"
                        />
                    </div>
                    {current < images.length - 1 && (
                        <button className="lightbox-arrow lightbox-arrow-right" onClick={onNext}>›</button>
                    )}
                </div>

                <div className="lightbox-caption">{images[current].alt}</div>
                <div className="lightbox-counter">{current + 1} / {images.length}</div>

                <div className="lightbox-thumbs">
                    {images.map((img, i) => (
                        <button key={i}
                            className={`lightbox-thumb ${i === current ? 'active' : ''}`}
                            onClick={() => goTo(i)}
                        >
                            <Image src={img.src} alt="" width={80} height={56} className="img-cover" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
