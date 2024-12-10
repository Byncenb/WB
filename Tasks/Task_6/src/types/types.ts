export type InventoryItem = {
  id: string;
  type: string;
  rarity: string;
  size: { width: number; height: number };
  position: { x: number; y: number }; // Координаты верхнего левого угла
};

export type InventoryData = {
  width: number; // Ширина сетки
  height: number; // Высота сетки
  items: InventoryItem[];
};