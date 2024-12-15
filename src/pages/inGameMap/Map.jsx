import { useEffect, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import MiniMap from '../../components/miniMap/MiniMap';

function Map ({ rawMapData }) {
  const [mapData, setMapData] = useState(rawMapData);
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });

  const visibleSize = 9; // Tamaño de la cuadrícula visible
  const gridSize = { rows: mapData.length, cols: mapData[0].length }; // Tamaño total del mapa

  const handleKeyDown = (e) => {
    e.preventDefault();
    // obtengo las "coordenadas" de la celda seleccionada
    const { row, col } = selectedCell;
  
    let newRow = row;
    let newCol = col;

    switch (e.key) {
      case 'ArrowUp':
        // si la row es major a 0 significa que se puede mover hacia arriba
        if (row > 0) {
          newRow = row - 1;
        }
        break;
      case 'ArrowDown':
        // si la row es menor al total de rows significa que se puede mover hacia abajo
        if (row < gridSize.rows - 1) {
          newRow = row + 1;
        }
        break;
      case 'ArrowLeft':
        // si la col es major a 0 significa que se puede mover hacia la izquierda
        if (col > 0) {
          newCol = col - 1;
        }
        break;
      case 'ArrowRight':
        // si la col es menor al total de cols significa que se puede mover hacia la derecha
        if (col < gridSize.cols - 1) {
          newCol = col + 1;
        }
        break;
      default:
        return;
    }
    // Verificar si la nueva celda es accesible
    if (mapData[newRow][newCol].accessible) {
      // Actualizar el estado de `mapData` para marcar la celda como visitada
      setMapData((prevMap) => {
        const updatedMap = [...prevMap];
        updatedMap[newRow][newCol] = {
          // Copia todas las propiedades de la celda anterior
          ...updatedMap[newRow][newCol],
          // Marca la celda como visitada
          visited: true,
        };
        return updatedMap;
      });
      // Actualizar la celda seleccionada a las nuevas "coordenadas"
      setSelectedCell({ row: newRow, col: newCol });
    }
  };

  useEffect(() => {
    // agrgego un evento para escuchar el teclado y si pasa se ejecuta y cuando se termina de ejecutar se elimina
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // al ejecutarse el listeners se modifica selectedCell lo que provoca que otra vez se ejecute el useEffect logando asi una escucha permanente sin crear bucles 
  }, [selectedCell, mapData]);

  const handleCellClick = (row, col) => {
    const cell = mapData[row][col];
    if (!cell.accessible || (!isAdjacentCell(selectedCell, { row, col }) && !cell.visited)) {
      return;
    }
    setSelectedCell({ row, col }); // Actualizo la celda seleccionada
    setMapData((prevMap) => {
      const updatedMap = [...prevMap]; // Creo una copia del mapa anterior
      updatedMap[row][col] = {
        ...updatedMap[row][col],
        visited: true, // Marco la celda como visitada
      };
      return updatedMap; // Devuelvo el mapa actualizado
    });
  };

  const isAdjacentCell = (selected, target) =>
    Math.abs(selected.row - target.row) <= 1 &&
    Math.abs(selected.col - target.col) <= 1;
  
  const renderGrid = () => {
    // Declaro una constante para guardar el mapa que se ve en pantalla
    const grid = [];
    
    // Declaro una constante para guardar la mitad del tamaño visible de la cuadrícula
    const halfVisible = Math.floor(visibleSize / 2);
  
    // Calculo el rango de filas visibles
    let startRow = Math.max(0, selectedCell.row - halfVisible); // Inicio de las filas visibles, evitando que sea negativo
    let endRow = Math.min(gridSize.rows, startRow + visibleSize); // Fin de las filas visibles, asegurándome de no exceder el tamaño total
  
    // Ajusto el rango de filas si el espacio visible es menor que el tamaño deseado
    if (endRow - startRow < visibleSize) {
      const diff = visibleSize - (endRow - startRow); // Diferencia para alcanzar el tamaño visible deseado
      startRow = Math.max(0, startRow - diff); // Desplazo hacia arriba si es necesario, sin salir del rango
      endRow = Math.min(gridSize.rows, startRow + visibleSize); // Ajusto el final del rango nuevamente
    }
  
    // Calculo el rango de columnas visibles, similar al cálculo de filas
    let startCol = Math.max(0, selectedCell.col - halfVisible); // Inicio de las columnas visibles, evitando valores negativos
    let endCol = Math.min(gridSize.cols, startCol + visibleSize); // Fin de las columnas visibles, respetando el tamaño máximo
  
    // Ajusto el rango de columnas si el espacio visible es menor que el tamaño deseado
    if (endCol - startCol < visibleSize) {
      const diff = visibleSize - (endCol - startCol); // Diferencia para ajustar el tamaño visible
      startCol = Math.max(0, startCol - diff); // Desplazo hacia la izquierda si es necesario, sin salir del rango
      endCol = Math.min(gridSize.cols, startCol + visibleSize); // Ajusto el final del rango de columnas
    }
  
    // Recorro las filas visibles para generar las celdas
    for (let row = startRow; row < endRow; row++) {
      const currentRow = []; // Array temporal para la fila actual
  
      // Recorro las columnas visibles en la fila actual
      for (let col = startCol; col < endCol; col++) {
        const cell = mapData[row][col]; // Obtengo los datos de la celda actual del mapa
  
        // Determino el estado de la celda
        const isSelected = selectedCell.row === row && selectedCell.col === col; // Si la celda es la seleccionada
        const isAccessible = cell.accessible; // Si la celda es accesible
        const cellColor = cell.color; // Color de fondo de la celda
        const isVisited = cell.visited; // Si la celda ya fue visitada
  
        // Agrego la celda al array temporal
        currentRow.push(
          <div
            key={`${row}-${col}`}
            // funcion para que al hacer click se mueva a la celda
            onClick={() => handleCellClick(row, col)}
            className={`
              w-20 h-20  flex items-center justify-center
              transition-all duration-300 relative
              ${isSelected ? // si es la celda seleccionada tendra un estilo
    'border-blue-500 border-4 bg-blue-100 scale-105 z-10' 
    : isAccessible && isVisited || isAdjacentCell(selectedCell, { row, col }) // si no esta seleccionada verifica que sea una celda accesible para darle un estilo
      ? 'border-gray-200 hover:bg-gray-50 cursor-pointer'  // Estilo para celdas accesibles no seleccionadas
      : 'bg-gray-300 border-gray-300 cursor-default' // Estilo para celdas no accesibles
}
            `}
            style={{
              backgroundColor: isAccessible ? cellColor : '', // Color de fondo solo si es accesible
              filter: isVisited ? 'none' : 'brightness(0.4)', // las celdas no visitadas son mas oscuras
            }}
            tabIndex="0" // Habilito la navegación con teclado
          >
          
            <div className="flex flex-col items-center justify-center space-y-1">
              {isSelected && 
                <FaLocationDot
                  className={'text-xl  text-blue-500'}
                />}
              <span className="text-xs font-medium text-gray-600 cursor-default">
                {`${row},${col}`}
              </span>
            </div>
          </div>
        );
      }
  
      // Agrego la fila actual al grid principal
      grid.push(
        <div key={row} className="flex">
          {currentRow}
        </div>
      );
    }
  
    return grid;
  };
  

  return (
    <>
      <div className="bg-gray-200 p-2 flex  justify-center">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          The Great Array Map
            </h2>
            <div className="flex flex-col items-center space-y-0">
              <div className="grid gap-0">{renderGrid()}</div>
              <p className="text-sm text-gray-600 mt-4">
            Use arrow keys or click on adjacent cells or visited cells to navigate.
              </p>
              <div className="text-sm text-gray-500">
            Current Position: ({selectedCell.row}, {selectedCell.col})
              </div>
            </div>
          </div>
        </div>
        <div className='flex-col justify-center items-baseline'>
          <span className='text-black text-xl'>MiniMap</span>
          <MiniMap
            mapData={mapData}
            handleMove={handleCellClick}
            selectedCell={selectedCell}
          />
        </div>
      </div>
    </>
  );
}

export default Map;
