"use client";

import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -23.55052, // Centro inicial (São Paulo)
  lng: -46.633308,
};

type Vehicle = {
  id: string;
  equipmentId: string;
  lat: number;
  lng: number;
  plate: string;
  fleet: string;
  createdAt: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/vehicles/list-with-paginate?type=tracked&page=1";

export default function TrackerMap() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [type, setType] = useState<"tracked" | "other">("tracked");

  useEffect(() => {
    let isMounted = true;
    const fetchData = () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL + `/vehicles/list-with-paginate?type=${type}&page=1`;
      fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) setVehicles(data.content.locationVehicles || []);
        });
    };
    fetchData();
    const interval = setInterval(fetchData, 120000); // 2 minutos
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [type]);

  return (
    <div className="bg-[#0a2536] rounded-2xl p-4 w-full max-w-7xl mx-auto mt-8 shadow-lg">
      <h2 className="text-white text-lg font-semibold mb-4">Mapa rastreador</h2>
      <div className="rounded-xl overflow-hidden" style={{ height: 500 }}>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
            {vehicles.map((v) => (
              <Marker key={v.id + v.equipmentId} position={{ lat: v.lat, lng: v.lng }} onClick={() => setSelected(v)} />
            ))}
            {selected && (
              <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
                <div>
                  <div className="font-bold">Placa: {selected.plate}</div>
                  <div>Frota: {selected.fleet}</div>
                  <div>{selected.createdAt}</div>
                  <div>
                    {selected.lat}, {selected.lng}
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
