import Header from "./components/Header";
import TrackerMap from "./components/TrackerMap";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="p-14 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-4xl font-bold text-white mr-40">Lista</h1>
          <label className="inline-flex items-center mr-4">
            <input type="radio" name="lista" className="form-radio" />
            <span className="ml-2 text-white">Rastreados</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="lista" className="form-radio" />
            <span className="ml-2 text-white">Outros</span>
          </label>
        </div>

        <div className="flex items-center">
          <input
            placeholder="Buscar por placa ou frota"
            type="text"
            className="bg-transparent border-2 w-96 border-gray-500 rounded-md p-2 text-white mr-6"
          />
          <button
            className="bg-blue-400 hover:bg-blue-600 
               transition duration-300 cursor-pointer w-50 text-black rounded-md p-2 text-white"
          >
            Novo
          </button>
        </div>
      </div>
      <hr className="border-blue-400 w-[93%] flex justify-center items-center mx-auto" />
      <div>
        <TrackerMap />
      </div>
    </div>
  );
}
