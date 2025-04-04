import type { DataOrdersInfo } from "../../types/types";
import data from "./allDeliveryProducts.json"

export const getOrders = (): DataOrdersInfo => {
    const orders = data.orders
    .map(order => ({
        id: order.id,
        products: order.products,
        state: order.state,
        orderDate: order.orderDate,
        receiptDate: order.receiptDate,
        buildDate: order.buildDate,
        totalSum: order.totalSum,
    }))
    .sort((a, b) => b.id - a.id);
    return { orders };
}