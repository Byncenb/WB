// Интерфейс двигателя
interface Engine {
    running: boolean;
    start(): void;
    stop(): void;
    getStatus(): string;
}

// Интерфейс коробки передач
interface Transmission {
    gear: number,
    shiftUp(): void;
    shiftDown(): void;
    getGear(): number;
}

// Интерфейс информационной системы
interface InfoSystem {
    message: string;
    showInfo(): void;
    updateInfo(message: string): void;
}

// Главный интерфейс автомобиля
interface Car {
    engine: Engine;
    transmission: Transmission;
    infoSystem: InfoSystem;

    displayCarStatus(): void;
    updateCarStatus(): void;
}

// Реализация подсистемы двигателя
const engine: Engine = {
    running: false,
    start() {
        this.running = true;
        console.log('Двигатель запущен.');
    },
    stop() {
        this.running = false;
        console.log('Двигатель остановлен.');
    },
    getStatus() {
        return this.running ? 'Работает' : 'Остановлен';
    }
};

// Реализация подсистемы коробки передач
const transmission: Transmission = {
    gear: 0,
    shiftUp() {
        if (this.gear < 5) {
            this.gear++;
            console.log(`Передача переключена вверх. Текущая передача: ${this.gear}`);
        } else {
            console.log('Достигнута максимальная передача.');
        }
    },
    shiftDown() {
        if (this.gear > 0) {
            this.gear--;
            console.log(`Передача переключена вниз. Текущая передача: ${this.gear}`);
        } else {
            console.log('Машина находится на нейтральной передаче.');
        }
    },
    getGear() {
        return this.gear;
    }
};

// Реализация подсистемы информационной системы
const infoSystem: InfoSystem = {
    message: 'Добро пожаловать!',
    showInfo() {
        console.log(`Сообщение информационной системы: ${this.message}`);
    },
    updateInfo(message: string) {
        this.message = message;
        console.log(`Информация обновлена: ${this.message}`);
    }
};

// Реализация автомобиля с использованием объектов для подсистем
const car: Car = {
    engine: engine,
    transmission: transmission,
    infoSystem: infoSystem,

    displayCarStatus() {
        console.log('--- Состояние автомобиля ---');
        console.log(`Двигатель: ${this.engine.getStatus()}`);
        console.log(`Текущая передача: ${this.transmission.getGear()}`);
        this.infoSystem.showInfo();
        console.log('----------------------------');
    },

    updateCarStatus() {
        console.log('Обновление статуса автомобиля...');
        this.engine.start();
        this.transmission.shiftUp();
        this.infoSystem.updateInfo('Все системы работают нормально.');
    }
};

// Использование объекта car для демонстрации работы
car.displayCarStatus();
car.updateCarStatus();
car.displayCarStatus();
