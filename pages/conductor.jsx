"use client";
import { useState, useEffect } from "react";

export default function ConductorPage() {
  const [coords, setCoords] = useState({ lat: 4.749, lng: -74.1 }); // punto inicial UdeC
  const [active, setActive] = useState(false);

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
          const newCoords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setCoords(newCoords);

          // Guardar temporalmente en localStorage (simulación del envío)
          localStorage.setItem("busLocation", JSON.stringify(newCoords));
        });
      }, 3000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [active]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-indigo-950 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Panel del Conductor 🧭</h1>
      <p className="text-gray-300 mb-6 text-center">
        Este dispositivo rastrea y actualiza la ubicación del bus.
      </p>

      <button
        onClick={() => setActive(!active)}
        className={`px-6 py-3 rounded-xl font-semibold shadow-md transition-all ${
          active
            ? "bg-red-600 hover:bg-red-500"
            : "bg-green-600 hover:bg-green-500"
        }`}
      >
        {active ? "🛑 Detener Rastreo" : "🚀 Iniciar Rastreo"}
      </button>

      <div className="mt-8 text-center">
        <h2 className="text-lg mb-2">Ubicación actual:</h2>
        <p>
          Lat: {coords.lat.toFixed(5)} | Lng: {coords.lng.toFixed(5)}
        </p>
      </div>
    </main>
  );
}

