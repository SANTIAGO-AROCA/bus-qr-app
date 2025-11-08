"use client"; // si usas la carpeta app
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const goToScan = () => {
    router.push("/scan");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 to-black text-white px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center drop-shadow-lg">
        🚌 Bus QR App
      </h1>
      <p className="text-lg md:text-xl text-gray-300 text-center max-w-md mb-10">
        Visualiza rutas, precios y escanea códigos QR para conocer la
        información de tu bus en tiempo real.
      </p>
      <button
        onClick={goToScan}
        className="bg-indigo-600 hover:bg-indigo-500 transition-all px-8 py-3 rounded-2xl text-lg font-semibold shadow-lg"
      >
        Escanear QR 🚀
      </button>
    </main>
  );
}
