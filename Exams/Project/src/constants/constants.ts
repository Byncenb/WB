export const startSnippet = {
  id: -1,
  src: '',
  name: '',
  description: '',
  price: 0,
  rating: '',
  folowers: 0,
  categoryIds: [-1],
  colors: [''],
  quantity: 0,
}

export const startOrder = {
  products: [startSnippet],
  totalPrice: 0,
  deliveryDate: '',
  deliveryAddress: '',
}

export const COLORS_NAME = {
    base: 'Базовый',
    blue: 'Синий',
    yellow: 'Желтый',
    green: 'Зеленый',
} as const;