import React, { useMemo } from 'react';

// Build an OpenStreetMap embed URL that frames both points if available
function buildOsmEmbedUrl(pickup, dropoff) {
  // Default: India view
  const defaultUrl = 'https://www.openstreetmap.org/export/embed.html?bbox=67.0%2C6.0%2C97.0%2C37.0&layer=mapnik';

  if (!pickup && !dropoff) return defaultUrl;

  const points = [pickup, dropoff].filter(Boolean);
  const lats = points.map(p => p.lat);
  const lons = points.map(p => p.lng);

  const minLat = Math.min(...lats) - 0.3;
  const maxLat = Math.max(...lats) + 0.3;
  const minLon = Math.min(...lons) - 0.3;
  const maxLon = Math.max(...lons) + 0.3;

  const bbox = `${minLon.toFixed(5)}%2C${minLat.toFixed(5)}%2C${maxLon.toFixed(5)}%2C${maxLat.toFixed(5)}`;

  // Show a marker at dropoff if set, else at pickup
  const marker = dropoff || pickup;
  const markerParam = marker ? `&marker=${marker.lat.toFixed(5)}%2C${marker.lng.toFixed(5)}` : '';

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik${markerParam}`;
}

export default function MapView({ pickup, dropoff }) {
  const url = useMemo(() => buildOsmEmbedUrl(pickup, dropoff), [pickup, dropoff]);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border bg-white">
      <iframe
        title="Ride map"
        src={url}
        className="w-full h-full"
        style={{ minHeight: 400 }}
      />
    </div>
  );
}
