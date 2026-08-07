'use client';

/**
 * ScenePicker — displays the curated scene library.
 * Uses the same .catalog-grid/.catalog-item/.catalog-item.selected
 * visual language as the configurator's CatalogPicker (A-8, A-11).
 */

import { useEffect, useState } from 'react';

export interface Scene {
  id: string;
  name: string;
  description?: string | null;
  imageUrl: string;
  sortOrder: number;
}

interface ScenePickerProps {
  selectedSceneId: string | null;
  onSceneSelect: (scene: Scene) => void;
}

export function ScenePicker({ selectedSceneId, onSceneSelect }: ScenePickerProps) {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/scenes')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load scenes');
        return res.json();
      })
      .then((data: Scene[]) => {
        setScenes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load scene library. Please refresh.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: 120 }}>
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="warning-banner">
        <span>⚠️</span>
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  return (
    <div>
      <p className="form-label mb-4" style={{ marginBottom: 'var(--space-3)' }}>
        Choose a Room Scene
      </p>
      <div className="scene-grid">
        {scenes.map((scene) => {
          const isSelected = selectedSceneId === scene.id;
          return (
            <button
              key={scene.id}
              id={`scene-option-${scene.id}`}
              className={`scene-card${isSelected ? ' selected' : ''}`}
              onClick={() => onSceneSelect(scene)}
              aria-pressed={isSelected}
              title={scene.description ?? scene.name}
            >
              {/* Scene thumbnail */}
              <div className="scene-card__thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={scene.imageUrl}
                  alt={scene.name}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {isSelected && (
                  <div className="scene-card__check" aria-hidden>
                    ✓
                  </div>
                )}
              </div>
              <div className="scene-card__name">{scene.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
