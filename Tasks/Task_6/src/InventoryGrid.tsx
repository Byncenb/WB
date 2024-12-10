import React from 'react';
import { InventoryData } from './types/types';
import { Item } from './Item';

type InventoryGridProps = {
  data: InventoryData;
};

export const InventoryGrid: React.FC<InventoryGridProps> = ({ data }) => {
  const { width, height, items } = data;

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${width}, 40px)`,
    gridTemplateRows: `repeat(${height}, 40px)`,
    gap: '2px',
    position: 'relative',
    width: `${width * 40}px`,
    height: `${height * 40}px`,
    border: '1px solid black',
    backgroundColor: '#f0f0f0',
  };

  return (
    <div style={gridStyle}>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};
