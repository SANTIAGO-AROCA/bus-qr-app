"use client";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Icono del bus
const busIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61222.png",
  iconSize: [38, 38],
});

// Coordenadas del trayecto: UdeC → Portal del Norte
const ruta = [
  [4.748697, -74.102104], // UdeC Chía
  [4.755186, -74.063999], // Variante
  [4.768238, -74.050202], // Sopó
  [4.783056, -74.039885], // Chía salida
  [4.819897, -74.033015], // Autopista Norte
  [4.859846, -74.028821], // Calle 170
  [4.883518, -74.025965], // Portal del Norte
];

export default function MapaUsuario({ busLocation }) {
  return (
    <MapContainer
      center={[busLocation.lat, busLocation.lng]}
      zoom={12}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      <Polyline positions={ruta} color="blue" weight={4} />

      <Marker position={[busLocation.lat, busLocation.lng]} icon={busIcon}>
        <Popup>🚌 Bus universitario en ruta</Popup>
      </Marker>
    </MapContainer>
  );
}
