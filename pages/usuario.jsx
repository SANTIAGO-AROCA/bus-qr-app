"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const MapWithNoSSR = dynamic(() => import("../components/MapaUsuario.jsx"), {
  ssr: false,
});

export default function UsuarioPage() {
  const [busLocation, setBusLocation] = useState({
    lat: 4.748697,
    lng: -74.102104,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const data = localStorage.getItem("busLocation");
      if (data) setBusLocation(JSON.parse(data));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-950 text-white p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Seguimiento del Bus 🚌
      </h1>
      <p className="mb-4 text-gray-400 text-center">
        Mapa en tiempo real del bus de la Universidad de Cundinamarca al Portal del Norte
      </p>

      <div className="w-full h-[80vh] rounded-2xl overflow-hidden shadow-lg border border-gray-700">
        <MapWithNoSSR busLocation={busLocation} />
      </div>
    </main>
  );
}
