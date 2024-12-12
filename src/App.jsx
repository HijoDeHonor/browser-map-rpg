import './App.css';
import Map from './pages/inGameMap/Map';
import  rawMapData from '../map.json';
import { addColorToMap, addTypesToMap, generateMap } from './services/mapService';
function App () {
  
  const defaultMap = generateMap();
  const mapWithTypes = addTypesToMap(rawMapData && Array.isArray(rawMapData) ? rawMapData : defaultMap);
  const mapGrid = addColorToMap(mapWithTypes);
  

  return (
    <>
      <Map rawMapData={mapGrid} />
    </>
  );
}

export default App;
