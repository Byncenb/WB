import { Component } from 'react';
import { InventoryGrid } from './InventoryGrid';
import inventoryData from '../public/inventory2.json'; // Импорт JSON
import { validateInventory } from './validation/validate';
import { InventoryData } from './types/types';

type AppState = {
  inventory: InventoryData | null;
};

export default class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    // Валидация данных при импорте
    const isValid = validateInventory(inventoryData);

    this.state = {
      inventory: isValid ? inventoryData : null,
    };
  }

  render() {
    const { inventory } = this.state;

    return (
      <div>
        {inventory ? (
          <InventoryGrid data={inventory} />
        ) : (
          <p>Инвентарь не прошел валидацию</p>
        )}
      </div>
    );
  }
}
