import React from 'react';
import type { InventoryItem } from './types/types';

type ItemProps = {
  item: InventoryItem;
};

const rarityColors: Record<InventoryItem['rarity'], string> = {
  common: '#ccc',
  rare: '#007bff',
  epic: '#8a2be2',
};

export const Item: React.FC<ItemProps> = ({ item }) => {
  const { type, rarity, size, position } = item;

  const itemStyle: React.CSSProperties = {
    position: 'absolute',
    top: `${position.y * 40}px`,
    left: `${position.x * 40}px`,
    width: `${size.width * 40}px`,
    height: `${size.height * 40}px`,
    backgroundColor: rarityColors[rarity],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
    boxSizing: 'border-box',
  };

  const typeIcons: Record<InventoryItem['type'], string> = {
    potion: 'зелье',
    equipment: 'снаряжение',
    weapon: 'оружие',
  };

  return (
    <div style={itemStyle} title={`${type} (${rarity})`}>
      {typeIcons[type]}
    </div>
  );
};