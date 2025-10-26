import React from 'react';
import { Car, MapPin, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-black text-white"><Car size={18} /></div>
          <span className="font-semibold text-lg">RideNow India</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-sm text-gray-600">
          <MapPin size={16} className="text-emerald-600" />
          <span>Operating in India</span>
        </div>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm hover:bg-gray-50">
          <User size={16} />
          Account
        </button>
      </div>
    </header>
  );
}
