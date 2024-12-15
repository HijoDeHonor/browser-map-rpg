import { memo } from 'react';

const MiniMap = memo (({ mapData, handleMove, selectedCell }) => {
  const isAdjacentCell = (selected, target) =>
    Math.abs(selected.row - target.row) <= 1 && 
    Math.abs(selected.col - target.col) <= 1;

  const handleCellClick = (row, col) => {
    if (selectedCell.row === row && selectedCell.col === col) {
      return;
    }
    handleMove(row, col);
  };

  return (
    <div
      className="bg-pink-900 rounded-3xl flex-col items-center justify-center px-10 py-10 mx-asd scale-25 hover:scale-90 hover:z-50 transition-all duration-300"
      style={{ transformOrigin: '0% 0%' }}
    >
      <div className="grid gap-0">
        {mapData.map((row, rowIndex) => (
          <div key={rowIndex} className="minimap-row flex">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`minimap-cell w-2 h-2 relative 
                  ${cell.visited || isAdjacentCell(selectedCell, { row: rowIndex, col: colIndex })
                ? 'cursor-pointer'
                : 'cursor-default'} 
                    ${selectedCell.row === rowIndex && selectedCell.col === colIndex
                ? 'border-2 border-white': ''}`}
                style={{
                  backgroundColor: cell.color,
                  filter: cell.visited ? 'none' : 'brightness(0.2)',
                  transform: selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'scale(1.3)' : 'scale(1)',
                  zIndex: selectedCell.row === rowIndex && selectedCell.col === colIndex ? 1 : 0,
                }}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

MiniMap.displayName = 'MiniMap';

export default MiniMap;
