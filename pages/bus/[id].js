import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MapContainer = dynamic(
  () => import("react-leaflet").then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then(mod => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then(mod => mod.Marker),
  { ssr: false }
);

export default function BusPage() {
  const router = useRouter();
  const { id } = router.query;
  const [pos, setPos] = useState([4.867, -74.05]); // coords base de Chia

  useEffect(() => {
    // simulacion de movimiento del bus
    const interval = setInterval(() => {
      setPos(([lat, lon]) => [lat + (Math.random() - 0.5) * 0.001, lon + (Math.random() - 0.5) * 0.001]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>🚌 Bus {id}</h1>
      <p>Ruta activa - seguimiento por 1 hora</p>
      <MapContainer center={pos} zoom={14} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={pos}></Marker>
      </MapContainer>
    </div>
  );
}