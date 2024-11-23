// Интерфейс способности
export interface Ability {
    name: string; // Название способности
    cost: number; // Стоимость в энергии (мане)
    effect: (caster: Unit, target: Unit) => void; // Эффект способности, зависящий от заклинателя (caster) и цели (target)
}

// Интерфейс юнита
export interface Unit {
    name: string; // Имя юнита
    health: number; // Текущее здоровье
    maxHealth: number; // Максимальное здоровье
    energy: number; // Текущая энергия
    maxEnergy: number; // Максимальная энергия
    abilities: Ability[]; // Список доступных способностей

    takeDamage(amount: number): void; // Получение урона
    heal(amount: number): void; // Восстановление здоровья
    useAbility(target: Unit, ability: Ability): boolean; // Использование способности
}

// Класс базового юнита
export class BasicUnit implements Unit {
    name: string;
    health: number;
    maxHealth: number;
    energy: number;
    maxEnergy: number;
    abilities: Ability[];

    constructor(name: string, health: number, energy: number, abilities: Ability[]) {
        this.name = name; // Имя юнита
        this.health = health; // Устанавливаем текущее здоровье
        this.maxHealth = health; // Максимальное здоровье
        this.energy = energy; // Устанавливаем текущую энергию
        this.maxEnergy = energy; // Максимальная энергия
        this.abilities = abilities; // Список способностей
    }

    // Реализация получения урона
    takeDamage(amount: number): void {
        this.health = Math.max(this.health - amount, 0); // Уменьшаем здоровье, но не ниже 0
    }

    // Реализация восстановления здоровья
    heal(amount: number): void {
        this.health = Math.min(this.health + amount, this.maxHealth); // Увеличиваем здоровье, но не выше максимума
    }

    // Использование способности
    useAbility(target: Unit, ability: Ability): boolean {
        if (this.energy >= ability.cost) {
            ability.effect(this, target); // Применяем эффект способности
            this.energy -= ability.cost; // Списываем стоимость с энергии
            return true;
        }
        return false; // Недостаточно энергии
    }
}

// Обычная атака: не требует маны, наносит фиксированный урон
export const basicAttack: Ability = {
    name: "Обычная атака",
    cost: 0,
    effect: (caster, target) => {
        target.takeDamage(10); // Наносит 10 урона
    },
};

// Лечение: восстанавливает здоровье, требует 15 энергии
export const heal: Ability = {
    name: "Лечение",
    cost: 15,
    effect: (caster, target) => {
        target.heal(20); // Восстанавливает 20 здоровья
    },
};

// Сильная атака: наносит больше урона, требует 15 энергии
export const strongAttack: Ability = {
    name: "Сильная атака",
    cost: 15,
    effect: (caster, target) => {
        target.takeDamage(20); // Наносит 20 урона
    },
};