'use client';

import { useState } from 'react';
import type { EquipmentCategory } from '@/data/properties';

interface EquipmentGridProps {
    categories: EquipmentCategory[];
}

export default function EquipmentGrid({ categories }: EquipmentGridProps) {
    const [expanded, setExpanded] = useState<string | null>(null);

    return (
        <div className="equipment-grid">
            {categories.map(cat => (
                <div key={cat.category} className="equipment-category">
                    <button
                        className={`equipment-category-header ${expanded === cat.category ? 'expanded' : ''}`}
                        onClick={() => setExpanded(expanded === cat.category ? null : cat.category)}
                    >
                        <span className="equipment-cat-icon">{cat.icon}</span>
                        <span className="equipment-cat-name">{cat.category}</span>
                        <span className="equipment-cat-count">{cat.items.length} 項</span>
                        <span className="equipment-cat-arrow">
                            {expanded === cat.category ? '▾' : '▸'}
                        </span>
                    </button>

                    <div className={`equipment-items ${expanded === cat.category ? 'show' : ''}`}>
                        {cat.items.map((item, i) => (
                            <div key={i} className="equipment-item">
                                <span className="equipment-item-icon">{item.icon}</span>
                                <div>
                                    <span className="equipment-item-label">{item.label}</span>
                                    {item.detail && (
                                        <span className="equipment-item-detail">{item.detail}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
