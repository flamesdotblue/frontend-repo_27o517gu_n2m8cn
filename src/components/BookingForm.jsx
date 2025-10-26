import React, { useMemo, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

const CITIES = [
  { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Pune', lat: 18.5204, lng: 73.8567 },
  { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
  { name: 'Lucknow', lat: 26.8467, lng: 80.9462 },
];

function haversineKm(a, b) {
  const R = 6371; // km
  const toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export default function BookingForm({ onChange }) {
  const [pickupText, setPickupText] = useState('');
  const [dropoffText, setDropoffText] = useState('');
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [focused, setFocused] = useState(null); // 'pickup' | 'dropoff'

  const filteredPickup = useMemo(() => {
    if (!pickupText) return CITIES;
    return CITIES.filter(c => c.name.toLowerCase().includes(pickupText.toLowerCase()));
  }, [pickupText]);

  const filteredDropoff = useMemo(() => {
    if (!dropoffText) return CITIES;
    return CITIES.filter(c => c.name.toLowerCase().includes(dropoffText.toLowerCase()));
  }, [dropoffText]);

  const distanceKm = useMemo(() => {
    if (pickup && dropoff) return Math.round(haversineKm(pickup, dropoff));
    return 0;
  }, [pickup, dropoff]);

  React.useEffect(() => {
    onChange({ pickup, dropoff, distanceKm });
  }, [pickup, dropoff, distanceKm, onChange]);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="relative">
          <label className="text-sm text-gray-600">Pickup</label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <MapPin size={16} className="text-emerald-600" />
            <input
              className="w-full outline-none"
              placeholder="Enter pickup city"
              value={pickupText}
              onChange={(e) => { setPickupText(e.target.value); setPickup(null); }}
              onFocus={() => setFocused('pickup')}
            />
          </div>
          {focused === 'pickup' && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded-md max-h-48 overflow-auto shadow-sm">
              {filteredPickup.map((c) => (
                <button
                  key={c.name}
                  onClick={() => { setPickup(c); setPickupText(c.name); setFocused(null); }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50"
                >{c.name}</button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="text-sm text-gray-600">Dropoff</label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <Navigation size={16} className="text-blue-600" />
            <input
              className="w-full outline-none"
              placeholder="Enter dropoff city"
              value={dropoffText}
              onChange={(e) => { setDropoffText(e.target.value); setDropoff(null); }}
              onFocus={() => setFocused('dropoff')}
            />
          </div>
          {focused === 'dropoff' && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded-md max-h-48 overflow-auto shadow-sm">
              {filteredDropoff.map((c) => (
                <button
                  key={c.name}
                  onClick={() => { setDropoff(c); setDropoffText(c.name); setFocused(null); }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50"
                >{c.name}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700 flex items-center justify-between">
        <span>Estimated distance</span>
        <span className="font-semibold">{distanceKm ? `${distanceKm} km` : '—'}</span>
      </div>
    </div>
  );
}
