'use client';

import { useState } from 'react';
import type { NearbySpot } from '@/data/properties';

interface LocationSectionProps {
    propertyName: string;
    address: string;
    location: { lat: number; lng: number };
    mapUrl: string;
    nearbySpots: NearbySpot[];
}

const TABS = [
    { id: 'all' as const, label: '全部', icon: '📍' },
    { id: 'attraction' as const, label: '景點', icon: '🎨' },
    { id: 'food' as const, label: '美食', icon: '🍜' },
    { id: 'transport' as const, label: '交通', icon: '🚇' },
    { id: 'convenience' as const, label: '生活', icon: '🏪' },
];

export default function LocationSection({ propertyName, address, location, mapUrl, nearbySpots }: LocationSectionProps) {
    const [activeTab, setActiveTab] = useState<string>('all');

    const filtered = activeTab === 'all'
        ? nearbySpots
        : nearbySpots.filter(s => s.category === activeTab);

    const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

    return (
        <section className="location-section">
            <div className="w">
                <div className="location-header">
                    <div className="scene-eyebrow">Location</div>
                    <h2 style={{ fontWeight: 400, letterSpacing: "0.08em" }}>地理位置與周邊機能</h2>
                    <p className="location-address">📍 {address}</p>
                </div>

                <div className="location-grid">
                    {/* Map */}
                    <div className="location-map-wrap">
                        <iframe
                            src={mapEmbedUrl}
                            className="location-map"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`${propertyName} 地圖`}
                        />
                        <a href={mapUrl} target="_blank" rel="noopener noreferrer"
                            className="location-map-link">
                            🗺️ 在 Google Maps 開啟
                        </a>
                    </div>

                    {/* Nearby spots */}
                    <div className="location-nearby">
                        <div className="location-tabs">
                            {TABS.map(tab => (
                                <button key={tab.id}
                                    className={`location-tab ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    <span className="location-tab-icon">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="location-spots">
                            {filtered.map((spot, i) => (
                                <div key={i} className="location-spot">
                                    <span className="location-spot-icon">{spot.icon}</span>
                                    <div className="location-spot-info">
                                        <div className="location-spot-name">{spot.name}</div>
                                        {spot.description && (
                                            <div className="location-spot-desc">{spot.description}</div>
                                        )}
                                    </div>
                                    <div className="location-spot-time">
                                        {spot.walkMinutes > 0
                                            ? <><span className="location-walk-icon">🚶</span> {spot.walkMinutes} 分鐘</>
                                            : <span className="location-spot-note">捷運可達</span>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
