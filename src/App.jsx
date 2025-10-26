import React from 'react';
import Header from './components/Header';
import BookingForm from './components/BookingForm';
import RideOptions from './components/RideOptions';
import MapView from './components/MapView';

export default function App() {
  const [pickup, setPickup] = React.useState(null);
  const [dropoff, setDropoff] = React.useState(null);
  const [distanceKm, setDistanceKm] = React.useState(0);
  const [selectedRide, setSelectedRide] = React.useState(null);

  const handleFormChange = ({ pickup, dropoff, distanceKm }) => {
    setPickup(pickup);
    setDropoff(dropoff);
    setDistanceKm(distanceKm);
  };

  const handleRequest = () => {
    if (!selectedRide || !pickup || !dropoff) return;
    const message = `Ride requested!\n\nType: ${selectedRide.name}\nFrom: ${pickup.name}\nTo: ${dropoff.name}\nDistance: ${distanceKm} km`;
    alert(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="space-y-6 order-2 lg:order-1">
          <div className="bg-white border rounded-xl p-5 space-y-5">
            <h2 className="text-lg font-semibold">Plan your ride</h2>
            <BookingForm onChange={handleFormChange} />
          </div>

          <div className="bg-white border rounded-xl p-5">
            <RideOptions
              distanceKm={distanceKm}
              selected={selectedRide}
              onSelect={setSelectedRide}
              onRequest={handleRequest}
            />
          </div>
        </section>

        <section className="order-1 lg:order-2 h-[420px] lg:h-[640px]">
          <MapView pickup={pickup} dropoff={dropoff} />
        </section>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">
        Made for India • Live fare estimates and routes shown for major cities
      </footer>
    </div>
  );
}
