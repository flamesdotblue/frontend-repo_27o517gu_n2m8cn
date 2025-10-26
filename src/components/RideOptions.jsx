import React, { useMemo } from 'react';
import { Car, Clock } from 'lucide-react';

const BASE_RIDES = [
  { id: 'ubergo', name: 'Go', icon: Car, base: 35, perKm: 12, eta: '3-5 min' },
  { id: 'premier', name: 'Premier', icon: Car, base: 60, perKm: 18, eta: '5-8 min' },
  { id: 'xl', name: 'XL', icon: Car, base: 90, perKm: 22, eta: '6-10 min' },
  { id: 'auto', name: 'Auto', icon: Car, base: 25, perKm: 10, eta: '2-4 min' },
];

function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
}

export default function RideOptions({ distanceKm, selected, onSelect, onRequest }) {
  const rides = useMemo(() => {
    return BASE_RIDES.map(r => ({
      ...r,
      price: Math.max(r.base, Math.round(r.base + r.perKm * (distanceKm || 0)))
    }));
  }, [distanceKm]);

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900">Choose your ride</h3>
      <div className="space-y-2">
        {rides.map(ride => {
          const Icon = ride.icon;
          const isActive = selected?.id === ride.id;
          return (
            <button
              key={ride.id}
              onClick={() => onSelect(ride)}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition ${isActive ? 'border-black bg-gray-50' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-black text-white"><Icon size={18} /></div>
                <div className="text-left">
                  <div className="font-medium">{ride.name}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1"><Clock size={14} /> {ride.eta}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 font-semibold">
                ₹{formatINR(ride.price)}
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onRequest}
        disabled={!selected || !distanceKm}
        className="w-full mt-2 bg-black text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Request {selected ? selected.name : 'Ride'}
      </button>
      <p className="text-xs text-gray-500">Fares are estimates and may vary due to traffic and route conditions.</p>
    </div>
  );
}
