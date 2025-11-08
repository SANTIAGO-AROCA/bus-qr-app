"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Import dinámico para evitar errores de renderizado en SSR
const QrReader = dynamic(() => import("react-qr-reader-es6"), { ssr: false });

export default function ScanPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = (result) => {
    if (result) {
      setData(result);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert(`Código detectado:\n${result}`);
      }, 1000);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-indigo-950 text-white p-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Escanear QR 🕵️‍♂️</h1>
      <p className="text-gray-300 mb-8 text-center">
        Apunta la cámara hacia el código QR del bus para ver la información.
      </p>

      <div className="bg-gray-900/40 backdrop-blur-md p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center border border-indigo-600">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "300px", height: "300px" }}
        />
        {loading ? (
          <p className="mt-4 text-indigo-400 animate-pulse">Procesando...</p>
        ) : (
          <p className="mt-4 text-gray-400 text-sm">
            {data ? "Código detectado ✅" : "Esperando código..."}
          </p>
        )}
      </div>

      <button
        onClick={() => router.push("/")}
        className="mt-10 bg-indigo-600 hover:bg-indigo-500 transition-all px-6 py-3 rounded-xl text-lg font-semibold shadow-md"
      >
        ⬅ Volver al inicio
      </button>
    </main>
  );
}
