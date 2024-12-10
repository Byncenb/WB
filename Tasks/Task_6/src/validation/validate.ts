import type { InventoryData } from "../types/types";

export const validateInventory = (data: InventoryData): boolean => {
    const grid = Array.from({ length: data.height }, () =>
        Array(data.width).fill(false)
    );

    for (const item of data.items) {
        const { position, size } = item;

        // Проверка выхода за границы
        if (
            position.x < 0 ||
            position.y < 0 ||
            position.x + size.width > data.width ||
            position.y + size.height > data.height
        ) {
            console.error(`Предмет ${item.id} вышел за границы.`);
            return false;
        }

        // Проверка на пересечение
        for (let y = position.y; y < position.y + size.height; y++) {
            for (let x = position.x; x < position.x + size.width; x++) {
            if (grid[y][x]) {
                console.error(`Предмет ${item.id} пересекает другой предмет.`);
                return false;
            }
            grid[y][x] = true;
            }
        }
    }
  
    return true;
  };