"use strict";
// Перечисление для статусов заказа
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Pending"] = "Pending";
    OrderStatus["Shipped"] = "Shipped";
    OrderStatus["Delivered"] = "Delivered";
    OrderStatus["Canceled"] = "Canceled";
})(OrderStatus || (OrderStatus = {}));
// Класс для товара
class Product {
    constructor(id, name, price, description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }
}
// Класс для корзины
class Cart {
    constructor() {
        this.items = [];
    }
    addProduct(product) {
        this.items.push(product);
        console.log(`Товар ${product.name} добавлен в корзину.`);
    }
    removeProduct(productId) {
        const index = this.items.findIndex(item => item.id === productId);
        if (index !== -1) {
            const removedProduct = this.items.splice(index, 1)[0];
            console.log(`Товар ${removedProduct.name} удален из корзины.`);
        }
        else {
            console.log('Товар не найден в корзине.');
        }
    }
    viewCart() {
        console.log('--- Содержимое корзины ---');
        this.items.forEach(item => {
            console.log(`- ${item.name}: ${item.price} RUB`);
        });
        console.log('-------------------------');
    }
    getTotalPrice() {
        return this.items.reduce((total, product) => total + product.price, 0);
    }
    clearCart() {
        this.items = [];
        console.log('Корзина очищена.');
    }
    getItems() {
        return [...this.items];
    }
}
// Класс для заказа
class Order {
    constructor(id, products, status = OrderStatus.Pending) {
        this.id = id;
        this.products = products;
        this.status = status;
    }
    getTotalPrice() {
        return this.products.reduce((total, product) => total + product.price, 0);
    }
    updateStatus(newStatus) {
        this.status = newStatus;
        console.log(`Статус заказа #${this.id} обновлен на '${this.status}'.`);
    }
    viewOrder() {
        console.log(`--- Заказ #${this.id} ---`);
        console.log(`Статус: ${this.status}`);
        console.log('Товары:');
        this.products.forEach(product => {
            console.log(`- ${product.name}: ${product.price} RUB`);
        });
        console.log(`Итоговая стоимость: ${this.getTotalPrice()} RUB`);
        console.log('-------------------------');
    }
}
// Класс для управления товарами
class ProductManager {
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
        console.log(`Товар ${product.name} добавлен в магазин.`);
    }
    removeProduct(productId) {
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
            const removedProduct = this.products.splice(index, 1)[0];
            console.log(`Товар ${removedProduct.name} удален из магазина.`);
        }
        else {
            console.log('Товар не найден в магазине.');
        }
    }
    listProducts() {
        console.log('--- Список товаров ---');
        this.products.forEach(product => {
            console.log(`- ${product.name}: ${product.price} RUB - ${product.description}`);
        });
        console.log('-------------------------');
    }
    getProductById(productId) {
        return this.products.find(product => product.id-- - productId);
    }
}
// Класс для управления заказами
class OrderManager {
    constructor() {
        this.orders = [];
        this.orderIdCounter = 1;
    }
    addOrder(products) {
        const newOrder = new Order(this.orderIdCounter++, products);
        this.orders.push(newOrder);
        console.log(`Заказ #${newOrder.id} создан.`);
        return newOrder;
    }
    updateOrderStatus(orderId, newStatus) {
        const order = this.orders.find(order => order.id === orderId);
        if (order) {
            order.updateStatus(newStatus);
        }
        else {
            console.log('Заказ не найден.');
        }
    }
    viewOrders() {
        console.log('--- Список заказов ---');
        this.orders.forEach(order => {
            order.viewOrder();
        });
        console.log('-------------------------');
    }
}
// Демонстрация работы системы
// Создаем менеджеры товаров и заказов
const productManager = new ProductManager();
const orderManager = new OrderManager();
const cart = new Cart();
// Добавляем товары в магазин
const product1 = new Product(1, 'Ноутбук', 100000, 'Мощный игровой ноутбук');
const product2 = new Product(2, 'Телефон', 70000, 'Крутой телефон чтобы все завидовали');
const product3 = new Product(3, 'Наушники', 15000, 'Беспроводные наушники');
productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);
// Просмотр товаров в магазине
productManager.listProducts();
// Добавляем товары в корзину
cart.addProduct(product1);
cart.addProduct(product2);
cart.addProduct(product3);
cart.removeProduct(product2.id);
cart.viewCart();
// Создаем заказ из корзины
const newOrder = orderManager.addOrder(cart.getItems());
cart.clearCart();
// Обновляем статус заказа
orderManager.updateOrderStatus(newOrder.id, OrderStatus.Shipped);
orderManager.updateOrderStatus(newOrder.id, OrderStatus.Delivered);
orderManager.viewOrders();
