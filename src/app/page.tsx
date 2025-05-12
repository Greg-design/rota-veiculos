"use client";

import { useState } from "react";
import Header from "./components/Header";
import TrackerMap from "./components/TrackerMap";
import VehicleTable from "./components/VehicleTable";
export default function Home() {
  const [type, setType] = useState<string>("tracked");
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 flex flex-row max-sm:flex-col items-center justify-between gap-4">
        <div className="flex flex-row items-center">
          <h1 className="text-4xl font-bold text-white mr-10">Lista</h1>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="lista"
              className="form-radio"
              checked={type === "tracked"}
              onChange={() => setType("tracked")}
            />
            <span className="ml-2 text-white">Rastreados</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="lista"
              className="form-radio"
              checked={type === "others"}
              onChange={() => setType("others")}
            />
            <span className="ml-2 text-white">Outros</span>
          </label>
        </div>

        <div className="flex flex-row items-center w-full sm:w-auto mt-4 sm:mt-0">
          <input
            placeholder="Buscar por placa ou frota"
            type="text"
            className="bg-transparent border-2 w-full sm:w-96 border-gray-500 rounded-md p-2 mr-6 text-white"
          />
          <button className="bg-blue-400 hover:bg-blue-600 transition duration-300 cursor-pointer w-full sm:w-40 text-black rounded-md p-2 text-white">
            Novo
          </button>
        </div>
      </div>
      <hr className="border-blue-400 w-[93%] flex justify-center items-center mx-auto" />

      <TrackerMap type={type} />
      <VehicleTable type={type} />
    </div>
  );
}
