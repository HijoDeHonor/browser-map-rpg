const generateMap = () => {
  return Array.from({ length: 50 }, () => 
    Array.from({ length: 50 }, () => ({ accessible: Math.random() > 0.25 }))
  );
};

function addColorToMap (mapData) {
  const colorMap = {
    grass: 'green',
    sand: 'sandybrown',
    water: 'blue',
    stone: 'gray',
    forest: 'darkgreen',
  };
  
  return mapData.map((row) => {
    return row.map((cell) => {
      const color = colorMap[cell.type] || 'white'; 
      return { ...cell, color };
    });
  });
}

function addTypesToMap (mapData) {
  const type = {
    1: 'grass',
    2: 'sand',
    3: 'water',
    4: 'stone',
    5: 'forest',
  };
  return mapData.map((row) => {
    return row.map((cell) => {
      const typeValue = type[Math.floor(Math.random() * 5) + 1];
      return { ...cell, type: typeValue };
    });
  });
}

export { generateMap, addColorToMap, addTypesToMap };
