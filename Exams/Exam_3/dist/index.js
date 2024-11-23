import { BasicUnit, basicAttack, heal, strongAttack } from "./unit.js";
import { Battle } from "./battle.js";
// Создаем юниты для игрока
const playerUnits = [
    new BasicUnit("Воин", 100, 50, [basicAttack, strongAttack]),
    new BasicUnit("Маг", 80, 40, [basicAttack, heal]),
];
// Создаем юниты для врага
const enemyUnits = [
    new BasicUnit("Гоблин", 60, 30, [basicAttack]),
    new BasicUnit("Орк", 90, 40, [basicAttack]),
];
// Инициализация сражение
const battle = new Battle(playerUnits, enemyUnits);
// Флаг, определяющий, включен ли автобой
let autoBattle = false;
// Переменная для хранения интервала автобоя
let autoBattleInterval = null;
// Функция отрисовки юнитов на экране
function renderUnits() {
    const playerDiv = document.getElementById("player-units");
    const enemyDiv = document.getElementById("enemy-units");
    // Отображение юнитов игрока
    if (playerDiv) {
        playerDiv.innerHTML = playerUnits
            .map((unit, index) => `<div class="unit">
                        ${unit.name}: ${unit.health}/${unit.maxHealth} HP, ${unit.energy}/${unit.maxEnergy} MP
                        <div>
                            ${unit.abilities
            .map((ability, i) => `<button onclick="selectSkill(${index}, ${i})">${ability.name} (${ability.cost} MP)</button>`)
            .join("")}
                        </div>
                    </div>`)
            .join("");
    }
    // Отображение юнитов врага
    if (enemyDiv) {
        enemyDiv.innerHTML = enemyUnits
            .map((unit, index) => `<div class="unit" onclick="selectTarget(${index})">
                        ${unit.name}: ${unit.health}/${unit.maxHealth} HP
                    </div>`)
            .join("");
    }
}
// Переменные для хранения выбранного юнита и способности
let selectedUnitIndex = null;
let selectedSkillIndex = null;
// Выбор способности для юнита
function selectSkill(unitIndex, skillIndex) {
    selectedUnitIndex = unitIndex;
    selectedSkillIndex = skillIndex;
}
// Выбор цели для способности
function selectTarget(targetIndex) {
    if (selectedUnitIndex !== null && selectedSkillIndex !== null) {
        const caster = playerUnits[selectedUnitIndex];
        // Если способность - "Лечение", цель - союзник, иначе - враг
        const target = playerUnits[selectedUnitIndex].abilities[selectedSkillIndex].name === "Лечение"
            ? playerUnits[targetIndex] // Лечение союзника
            : enemyUnits[targetIndex]; // Атака врага
        battle.takeTurn(caster, target, selectedSkillIndex); // Выполняем действие
        selectedUnitIndex = null; // Сбрасываем выбор
        selectedSkillIndex = null;
        renderUnits(); // Обновляем экран
    }
}
// Очищаем журнал действий
function clearLog() {
    battle.clearLog();
}
// Включение и отключение режима "Автобой"
function toggleAutoBattle() {
    autoBattle = !autoBattle; // Переключаем состояние
    const autoBattleButton = document.getElementById("auto-battle-btn");
    if (autoBattleButton) {
        // Обновляем текст кнопки
        autoBattleButton.textContent = autoBattle ? "Отключить автобой" : "Включить автобой";
    }
    if (autoBattle) {
        // Запускаем интервал для автопилота
        autoBattleInterval = setInterval(() => {
            if (battle.currentTurn === "player") {
                playerUnits
                    .filter(unit => unit.health > 0) // Только живые юниты
                    .forEach(unit => {
                    const enemyTargets = enemyUnits.filter(enemy => enemy.health > 0);
                    const allyTargets = playerUnits.filter(ally => ally.health < ally.maxHealth);
                    // Выбираем цель: союзника для лечения или врага для атаки
                    const target = unit.abilities[0].name === "Лечение" && allyTargets.length > 0
                        ? allyTargets[0] // Лечение союзника
                        : enemyTargets[0]; // Атака врага
                    if (target) {
                        battle.takeTurn(unit, target, 0); // Используем первую способность
                    }
                });
                renderUnits(); // Обновляем экран
            }
        }, 1500);
    }
    else if (autoBattleInterval) {
        // Останавливаем автобой
        clearInterval(autoBattleInterval);
        autoBattleInterval = null;
    }
}
// Экспортируем функции для использования в HTML
window.selectSkill = selectSkill;
window.selectTarget = selectTarget;
window.clearLog = clearLog;
window.toggleAutoBattle = toggleAutoBattle;
// Начальная отрисовка юнитов
renderUnits();
