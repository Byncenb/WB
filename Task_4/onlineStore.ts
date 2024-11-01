// Перечисление для статусов заказа
enum OrderStatus {
    Pending = 'Pending',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Canceled = 'Canceled'
}

// Интерфейс для товара
interface IProduct {
    id: number;
    name: string;
    price: number;
    description: string;
}

// Интерфейс для заказа
interface IOrder {
    id: number;
    products: Product[];
    status: OrderStatus;
    getTotalPrice(): number;
}

// Класс для товара
class Product implements IProduct {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public description: string
    ) {}
}

// Класс для корзины
class Cart {
    private items: Product[] = [];

    addProduct(product: Product): void {
        this.items.push(product);
        console.log(`Товар ${product.name} добавлен в корзину.`);
    }

    removeProduct(productId: number): void {
        const index = this.items.findIndex(item => item.id === productId);
        if (index !== -1) {
            const removedProduct = this.items.splice(index, 1)[0];
            console.log(`Товар ${removedProduct.name} удален из корзины.`);
        } else {
            console.log('Товар не найден в корзине.');
        }
    }

    viewCart(): void {
        console.log('--- Содержимое корзины ---');
        this.items.forEach(item => {
            console.log(`- ${item.name}: ${item.price} RUB`);
        });
        console.log('-------------------------');
    }

    getTotalPrice(): number {
        return this.items.reduce((total, product) => total + product.price, 0);
    }

    clearCart(): void {
        this.items = [];
        console.log('Корзина очищена.');
    }

    getItems(): Product[] {
        return [...this.items];
    }
}

// Класс для заказа
class Order implements IOrder {
    constructor(
        public id: number,
        public products: Product[],
        public status: OrderStatus = OrderStatus.Pending
    ) {}

    getTotalPrice(): number {
        return this.products.reduce((total, product) => total + product.price, 0);
    }

    updateStatus(newStatus: OrderStatus): void {
        this.status = newStatus;
        console.log(`Статус заказа #${this.id} обновлен на '${this.status}'.`);
    }

    viewOrder(): void {
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
    private products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
        console.log(`Товар ${product.name} добавлен в магазин.`);
    }

    removeProduct(productId: number): void {
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
            const removedProduct = this.products.splice(index, 1)[0];
            console.log(`Товар ${removedProduct.name} удален из магазина.`);
        } else {
            console.log('Товар не найден в магазине.');
        }
    }

    listProducts(): void {
        console.log('--- Список товаров ---');
        this.products.forEach(product => {
            console.log(`- ${product.name}: ${product.price} RUB - ${product.description}`);
        });
        console.log('-------------------------');
    }

    getProductById(productId: number): Product | undefined {
        return this.products.find(product => product.id --- productId);
    }
}

// Класс для управления заказами
class OrderManager {
    private orders: Order[] = [];
    private orderIdCounter: number = 1;

    addOrder(products: Product[]): Order {
        const newOrder = new Order(this.orderIdCounter++, products);
        this.orders.push(newOrder);
        console.log(`Заказ #${newOrder.id} создан.`);
        return newOrder;
    }

    updateOrderStatus(orderId: number, newStatus: OrderStatus): void {
        const order = this.orders.find(order => order.id === orderId);
        if (order) {
            order.updateStatus(newStatus);
        } else {
            console.log('Заказ не найден.');
        }
    }

    viewOrders(): void {
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