import { Unit } from "./unit";

// Класс, отвечающий за управление боем
export class Battle {
    playerUnits: Unit[]; // Юниты игрока
    enemyUnits: Unit[]; // Юниты врага
    log: string[] = []; // Журнал действий
    currentTurn: "player" | "enemy" = "player"; // Чей сейчас ход

    constructor(playerUnits: Unit[], enemyUnits: Unit[]) {
        this.playerUnits = playerUnits; // Инициализация юнитов игрока
        this.enemyUnits = enemyUnits; // Инициализация юнитов врага
    }

    // Добавление записи в журнал
    logAction(message: string): void {
        this.log.push(message); // Сохраняем сообщение
        const logElement = document.getElementById("log");
        if (logElement) {
            logElement.innerHTML += `<p>${message}</p>`; // Отображаем сообщение на экране
        }
    }

    // Очистка журнала
    clearLog(): void {
        this.log = [];
        const logElement = document.getElementById("log");
        if (logElement) {
            logElement.innerHTML = "";
        }
    }

    // Проверка завершения игры
    isGameOver(): boolean {
        const playerAlive = this.playerUnits.some(unit => unit.health > 0); // Есть ли живые юниты у игрока
        const enemyAlive = this.enemyUnits.some(unit => unit.health > 0); // Есть ли живые юниты у врага

        if (!playerAlive || !enemyAlive) {
            this.logAction(playerAlive ? "Вы победили!" : "Вы проиграли!"); // Сообщение о результате
            return true; // Игра окончена
        }
        return false; // Игра продолжается
    }

    // Выполнение хода игрока
    takeTurn(caster: Unit, target: Unit, abilityIndex: number): void {
        if (this.currentTurn === "player") {
            const ability = caster.abilities[abilityIndex]; // Выбираем способность
            if (caster.useAbility(target, ability)) {
                this.logAction(`${caster.name} использует ${ability.name} на ${target.name}`); // Логируем действие
            } else {
                this.logAction(`${caster.name} не хватает энергии для ${ability.name}`); // Логируем отказ
            }
            this.endPlayerTurn(); // Завершаем ход игрока
        }
    }

    // Ход врага
    enemyTurn(): void {
        this.logAction("Ход врага:"); // Логируем начало хода
        const attackers = this.enemyUnits.filter(enemy => enemy.health > 0); // Только живые враги
        const targets = this.playerUnits.filter(player => player.health > 0); // Только живые игроки

        if (attackers.length > 0 && targets.length > 0) {
            const enemy = attackers[0]; // Первый доступный враг
            const target = targets[0]; // Первый доступный игрок
            const ability = enemy.abilities[0]; // Враг всегда использует первую способность

            if (enemy.useAbility(target, ability)) {
                this.logAction(`${enemy.name} использует ${ability.name} на ${target.name}`); // Логируем действие
            } else {
                this.logAction(`${enemy.name} не хватает энергии для ${ability.name}`); // Логируем отказ
            }
        }

        this.currentTurn = "player"; // Передаем ход игроку
        this.checkGameOver(); // Проверяем завершение игры
    }

    // Завершение хода игрока
    endPlayerTurn(): void {
        if (!this.isGameOver()) {
            this.currentTurn = "enemy"; // Передаем ход врагу
            setTimeout(() => this.enemyTurn(), 1000); // Пауза перед ходом врага
        }
    }

    // Проверка завершения игры
    checkGameOver(): void {
        if (this.isGameOver()) {
            const gameArea = document.getElementById("game");
            if (gameArea) {
                gameArea.innerHTML += "<h2>Игра завершена!</h2>"; // Отображаем сообщение об окончании игры
            }
        }
    }
}