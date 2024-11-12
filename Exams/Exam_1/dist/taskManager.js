"use strict";
// Класс для управления задачами
class TaskManager {
    constructor() {
        this.tasks = [];
        this.loadTasks(); // Загрузка задач из localStorage при инициализации
    }
    // Метод для добавления задачи
    addTask(status, taskType, title, description, additionalFields) {
        const id = String(Date.now()); // Генерация уникального ID
        const baseTask = { id, title, description, status, type: taskType };
        // Создание задачи на основе типа
        let newTask;
        switch (taskType) {
            case 'deadline':
                newTask = { ...baseTask, deadline: additionalFields?.deadline };
                break;
            case 'responsible':
                newTask = { ...baseTask, responsiblePerson: additionalFields?.responsiblePerson };
                break;
            case 'location':
                newTask = { ...baseTask, location: additionalFields?.location };
                break;
            default:
                newTask = baseTask;
        }
        this.tasks.push(newTask);
        this.saveTasks(); // Сохранение данных после добавления
    }
    // Метод для удаления задачи
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }
    // Фильтрация задач по статусу
    filterTasksByStatus(tasks, status) {
        return tasks.filter(task => task.status === status);
    }
    // Фильтрация задач по типу
    filterTasksByType(tasks, taskType) {
        const filteredTasks = tasks.filter(task => {
            switch (taskType) {
                case 'deadline': return 'deadline' in task;
                case 'responsible': return 'responsiblePerson' in task;
                case 'location': return 'location' in task;
                default: return true;
            }
        });
        return filteredTasks; // Если ничего не найдено, то filteredTasks будет пустым массивом
    }
    // Сохранение задач в localStorage
    saveTasks() {
        try {
            const serializedTasks = JSON.stringify(this.tasks);
            localStorage.setItem('tasks', serializedTasks);
        }
        catch (error) {
            console.error('Error saving tasks:', error);
        }
    }
    // Загрузка задач из localStorage
    loadTasks() {
        try {
            const serializedTasks = localStorage.getItem('tasks');
            if (serializedTasks) {
                const parsedTasks = JSON.parse(serializedTasks);
                this.tasks = parsedTasks.map((task) => {
                    if (task.deadline)
                        task.deadline = new Date(task.deadline);
                    return task;
                });
            }
        }
        catch (error) {
            console.error('Error loading tasks:', error);
            this.tasks = []; // Защита от порчи данных
        }
    }
    // Получение всех задач
    getAllTasks() {
        return this.tasks;
    }
}
// Пример использования
const taskManager = new TaskManager();
function addTask() {
    const title = document.getElementById('taskTitle')?.value || '';
    const description = document.getElementById('taskDescription')?.value || '';
    const taskType = document.getElementById('taskType')?.value || 'basic';
    const taskStatus = document.getElementById('taskStatus')?.value || 'incomplete';
    const deadline = document.getElementById('taskDeadline')?.value || '';
    const responsiblePerson = document.getElementById('taskResponsible')?.value || '';
    const location = document.getElementById('taskLocation')?.value || '';
    let additionalFields = {};
    if (taskType === 'deadline' && deadline) {
        additionalFields.deadline = new Date(deadline);
    }
    else if (taskType === 'responsible' && responsiblePerson) {
        additionalFields.responsiblePerson = responsiblePerson;
    }
    else if (taskType === 'location' && location) {
        additionalFields.location = location;
    }
    taskManager.addTask(taskStatus, taskType, title, description, additionalFields);
    renderTasks();
}
function applyFilter() {
    const statusFilter = document.getElementById('statusFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    let filteredTasks = taskManager.getAllTasks();
    if (statusFilter !== 'all') {
        filteredTasks = taskManager.filterTasksByStatus(filteredTasks, statusFilter);
    }
    if (typeFilter !== 'all') {
        filteredTasks = taskManager.filterTasksByType(filteredTasks, typeFilter);
    }
    renderTasks(filteredTasks);
}
function renderTasks(tasks = taskManager.getAllTasks()) {
    const taskList = document.getElementById('taskList');
    if (!taskList)
        return;
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.title} - ${task.status === 'completed' ? 'Выполнено' : 'Не выполнено'}`;
        const typeMapping = {
            deadline: 'С дедлайном',
            location: 'С местом проведения',
            responsible: 'С ответственным лицом',
            basic: 'Базовая',
        };
        // Проверяем тип и добавляем соответствующее значение
        const taskType = task.type;
        if (taskType in typeMapping) {
            li.textContent += ` - ${typeMapping[taskType]}`;
        }
        else {
            li.textContent += ` - ${typeMapping.basic}`;
        }
        // Добавляем значение для выбранного типа задачи, если оно существует
        if (task.deadline)
            li.textContent += ` - Значение: ${task.deadline}`;
        else if (task.location)
            li.textContent += ` - Значение: ${task.location}`;
        else if (task.responsiblePerson)
            li.textContent += ` - Значение: ${task.responsiblePerson}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.onclick = () => {
            taskManager.deleteTask(task.id);
            renderTasks();
        };
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const taskTitle = document.getElementById('taskTitle');
    const taskDescription = document.getElementById('taskDescription');
    const taskType = document.getElementById('taskType');
    const taskStatus = document.getElementById('taskStatus');
    const addTaskButton = document.getElementById('addTask');
    const applyFilterButton = document.getElementById('applyFilter');
    const taskDeadline = document.getElementById('taskDeadline');
    const taskResponsible = document.getElementById('taskResponsible');
    const taskLocation = document.getElementById('taskLocation');
    // Добавляем событие click для кнопок
    if (addTaskButton) {
        addTaskButton.addEventListener('click', addTask);
    }
    if (applyFilterButton) {
        applyFilterButton.addEventListener('click', applyFilter);
    }
    // Проверяем заполненность полей
    if (taskTitle && taskDescription && taskType && taskStatus && addTaskButton && taskDeadline && taskResponsible && taskLocation) {
        taskTitle.addEventListener('input', checkFields);
        taskDescription.addEventListener('input', checkFields);
        taskType.addEventListener('change', checkFields);
        taskStatus.addEventListener('change', checkFields);
        taskDeadline.addEventListener('change', checkFields);
        taskResponsible.addEventListener('change', checkFields);
        taskLocation.addEventListener('change', checkFields);
    }
    // Обрабатываем изменения в типе задачи
    if (taskType)
        taskType.addEventListener('change', onChangeTaskType);
});
// Функция для проверки заполненных полей
function checkFields() {
    const taskTitle = document.getElementById('taskTitle');
    const taskDescription = document.getElementById('taskDescription');
    const taskType = document.getElementById('taskType');
    const taskDeadline = document.getElementById('taskDeadline');
    const taskResponsible = document.getElementById('taskResponsible');
    const taskLocation = document.getElementById('taskLocation');
    const addTaskButton = document.getElementById('addTask');
    const isTaskTitleFilled = taskTitle.value.trim() !== '';
    const isTaskDescriptionFilled = taskDescription.value.trim() !== '';
    const isTaskTypeSelected = taskType.value !== '';
    // Проверяем заполненность дополнительных полей в зависимости от выбранного типа задачи
    const selectedTaskType = taskType.value;
    const isTaskDeadlineFilled = selectedTaskType === 'deadline' ? taskDeadline.value.trim() !== '' : true;
    const isTaskResponsibleFilled = selectedTaskType === 'responsible' ? taskResponsible.value.trim() !== '' : true;
    const isTaskLocationFilled = selectedTaskType === 'location' ? taskLocation.value.trim() !== '' : true;
    // Проверяем, нужно ли активировать кнопку
    addTaskButton.disabled = !(isTaskTitleFilled && isTaskDescriptionFilled && isTaskTypeSelected &&
        isTaskDeadlineFilled && isTaskResponsibleFilled && isTaskLocationFilled);
}
// Функция для включния и выключения дополнительных полей
function onChangeTaskType() {
    const taskDeadline = document.getElementById('taskDeadline');
    const taskResponsible = document.getElementById('taskResponsible');
    const taskLocation = document.getElementById('taskLocation');
    const taskType = document.getElementById('taskType');
    const selectedTaskType = taskType.value;
    taskDeadline.disabled = selectedTaskType !== 'deadline';
    taskResponsible.disabled = selectedTaskType !== 'responsible';
    taskLocation.disabled = selectedTaskType !== 'location';
    // Очищаем значения, если соответствующее поле отключено
    if (selectedTaskType !== 'deadline') {
        taskDeadline.value = '';
    }
    if (selectedTaskType !== 'responsible') {
        taskResponsible.value = '';
    }
    if (selectedTaskType !== 'location') {
        taskLocation.value = '';
    }
    checkFields(); // Проверяем поля после изменения типа задачи
}
