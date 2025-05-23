"use client";
import { useEffect, useRef, useState } from "react";

type Vehicle = {
  id: string;
  plate: string;
  fleet: string | null;
  type: string;
  model: string;
  status: string;
  lat: number;
  lng: number;
};

type ApiResponse = {
  content: {
    vehicles: Vehicle[];
    totalPages: number;
    page: number;
    perPage: number;
  };
};

// Funções utilitárias para tradução
const traduzirTipo = (tipo: string) => {
  switch (tipo) {
    case "vehicle":
      return "Motor";
    case "implement":
      return "Implemento";
    default:
      return tipo;
  }
};

const traduzirStatus = (status: string) => {
  switch (status) {
    case "active":
      return "Disponível";
    case "in_travel":
      return "Em viagem";
    case "maintenance":
      return "Em manutenção";
    default:
      return status;
  }
};

export default function VehicleTable({ type }: { type: string }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVehicles([]);
    setPage(1);
    setHasMore(true);
  }, [type]);

  useEffect(() => {
    if (!hasMore) return;
    setLoading(true);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/vehicles/list-with-paginate?type=${type}&page=${page}`;
    fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        setVehicles((prev) => [...prev, ...(data.content.vehicles || [])]);
        setHasMore(page < data.content.totalPages);
        setLoading(false);
      });
  }, [page, type, hasMore]);

  // Infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return;
    const handleScroll = () => {
      if (loader.current && loader.current.getBoundingClientRect().top < window.innerHeight) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <div className="bg-[#0a2536] mt-8 rounded-2xl p-4 w-full max-w-7xl mx-auto shadow-lg overflow-x-auto">
      <table className="min-w-full text-left text-gray-200">
        <thead>
          <tr className="border-b border-[#1a3344]">
            <th className="px-4 py-3 font-bold">Placa</th>
            <th className="px-4 py-3 font-bold">Frota</th>
            <th className="px-4 py-3 font-bold">Tipo</th>
            <th className="px-4 py-3 font-bold">Modelo</th>
            <th className="px-4 py-3 font-bold">Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id} className="border-b border-[#1a3344] hover:bg-[#001e2e] transition">
              <td className="px-4 py-2">{v.plate}</td>
              <td className="px-4 py-2">{v.fleet || "-"}</td>
              <td className="px-4 py-2">{traduzirTipo(v.type)}</td>
              <td className="px-4 py-2">{v.model}</td>
              <td className="px-4 py-2 flex items-center gap-2">
                {traduzirStatus(v.status)}
                {v.lat && v.lng && (
                  <a
                    href={`https://www.google.com/maps?q=${v.lat},${v.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline ml-2 text-xs hover:text-blue-200"
                  >
                    Ver no mapa
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <div className="text-center text-gray-400 py-4">Carregando...</div>}
      <div ref={loader}></div>
    </div>
  );
}
