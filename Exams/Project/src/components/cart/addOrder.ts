import { OrdersData } from "./type";

export function addOrder(data: OrdersData, products: number[], newTotalSum: number, orderNumber: number) {
    const newOrder = {
        id: orderNumber,
        products: products.map(id => ({ id })),
        state: "ready",
        orderDate: getFormattedDate(),
        receiptDate: '',
        buildDate: '',
        totalSum: newTotalSum
    };

    data.orders.push(newOrder);
    return data;
}

function getFormattedDate() {
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const today = new Date();
    const day = today.getDate();
    const monthIndex = today.getMonth();

    return `${day} ${months[monthIndex]}`;
}