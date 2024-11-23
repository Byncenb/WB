// Класс базового юнита
export class BasicUnit {
    constructor(name, health, energy, abilities) {
        this.name = name; // Имя юнита
        this.health = health; // Устанавливаем текущее здоровье
        this.maxHealth = health; // Максимальное здоровье
        this.energy = energy; // Устанавливаем текущую энергию
        this.maxEnergy = energy; // Максимальная энергия
        this.abilities = abilities; // Список способностей
    }
    // Реализация получения урона
    takeDamage(amount) {
        this.health = Math.max(this.health - amount, 0); // Уменьшаем здоровье, но не ниже 0
    }
    // Реализация восстановления здоровья
    heal(amount) {
        this.health = Math.min(this.health + amount, this.maxHealth); // Увеличиваем здоровье, но не выше максимума
    }
    // Использование способности
    useAbility(target, ability) {
        if (this.energy >= ability.cost) {
            ability.effect(this, target); // Применяем эффект способности
            this.energy -= ability.cost; // Списываем стоимость с энергии
            return true;
        }
        return false; // Недостаточно энергии
    }
}
// Обычная атака: не требует маны, наносит фиксированный урон
export const basicAttack = {
    name: "Обычная атака",
    cost: 0,
    effect: (caster, target) => {
        target.takeDamage(10); // Наносит 10 урона
    },
};
// Лечение: восстанавливает здоровье, требует 15 энергии
export const heal = {
    name: "Лечение",
    cost: 15,
    effect: (caster, target) => {
        target.heal(20); // Восстанавливает 20 здоровья
    },
};
// Сильная атака: наносит больше урона, требует 15 энергии
export const strongAttack = {
    name: "Сильная атака",
    cost: 15,
    effect: (caster, target) => {
        target.takeDamage(20); // Наносит 20 урона
    },
};
