// Тип для одного продукта в заказе
type Product = {
    id: number;
    rate?: number; // Опциональное поле
};

// Тип для одного заказа
type Order = {
    id: number;
    products: Product[];
    state: string;
    orderDate: string;
    receiptDate: string;
    buildDate: string;
    totalSum: number;
};

// Тип для всего JSON
export type OrdersData = {
    orders: Order[];
};