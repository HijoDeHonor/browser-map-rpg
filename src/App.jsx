import './App.css';
import Map from './pages/inGameMap/Map';
//import rawMapData from '../map.json';
import rawMapData2 from '../src/utils/map/map2.json';
import { addColorToMap, addTypesToMap, generateMap } from './services/mapService';
function App () {
  
  const defaultMap = generateMap();
  const mapWithTypes = addTypesToMap(rawMapData2 && Array.isArray(rawMapData2) ? rawMapData2 : defaultMap);
  const mapGrid = addColorToMap(mapWithTypes);
  

  return (
    <>
      <div className="container mx-auto my-auto pt-1 bg-red-700">
        <Map rawMapData={mapGrid} />
      </div>
    </>
  );
}

export default App;
