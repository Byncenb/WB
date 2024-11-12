// Типизация статуса задачи
type TaskStatus = 'completed' | 'incomplete';

// Базовый интерфейс для задачи
interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    type: TaskType;
}

// Дополнительные типы задач
interface DeadlineTask extends Task {
    deadline: Date;
}

interface ResponsibleTask extends Task {
    responsiblePerson: string;
}

interface LocationTask extends Task {
    location: string;
}

// Перечисление типов задач
type TaskType = 'basic' | 'deadline' | 'responsible' | 'location';

// Класс для управления задачами
class TaskManager {
    private tasks: Task[] = [];

    constructor() {
        this.loadTasks(); // Загрузка задач из localStorage при инициализации
    }

    // Метод для добавления задачи
    addTask(status: TaskStatus, taskType: TaskType, title: string, description: string, additionalFields?: Partial<DeadlineTask & ResponsibleTask & LocationTask>) {
        const id = String(Date.now()); // Генерация уникального ID
        const baseTask: Task = { id, title, description, status, type: taskType };

        // Создание задачи на основе типа
        let newTask: Task;
        switch (taskType) {
            case 'deadline':
                newTask = { ...baseTask, deadline: additionalFields?.deadline! } as DeadlineTask;
                break;
            case 'responsible':
                newTask = { ...baseTask, responsiblePerson: additionalFields?.responsiblePerson! } as ResponsibleTask;
                break;
            case 'location':
                newTask = { ...baseTask, location: additionalFields?.location! } as LocationTask;
                break;
            default:
                newTask = baseTask;
        }

        this.tasks.push(newTask);
        this.saveTasks(); // Сохранение данных после добавления
    }

    // Метод для удаления задачи
    deleteTask(id: string) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    // Фильтрация задач по статусу
    filterTasksByStatus(tasks: Task[], status: TaskStatus): Task[] {
        return tasks.filter(task => task.status === status);
    }

    // Фильтрация задач по типу
    filterTasksByType(tasks: Task[], taskType: TaskType): Task[] {
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
    private saveTasks() {
        try {
            const serializedTasks = JSON.stringify(this.tasks);
            localStorage.setItem('tasks', serializedTasks);
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }

    // Загрузка задач из localStorage
    private loadTasks() {
        try {
            const serializedTasks = localStorage.getItem('tasks');
            if (serializedTasks) {
                const parsedTasks = JSON.parse(serializedTasks);
                this.tasks = parsedTasks.map((task: any) => {
                    if (task.deadline) task.deadline = new Date(task.deadline);
                    return task;
                });
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
            this.tasks = []; // Защита от порчи данных
        }
    }

    // Получение всех задач
    getAllTasks(): Task[] {
        return this.tasks;
    }
}

// Пример использования
const taskManager = new TaskManager();

function addTask() {
    const title = (document.getElementById('taskTitle') as HTMLInputElement)?.value || '';
    const description = (document.getElementById('taskDescription') as HTMLInputElement)?.value || '';
    const taskType = (document.getElementById('taskType') as HTMLInputElement)?.value || 'basic';
    const taskStatus = (document.getElementById('taskStatus') as HTMLInputElement)?.value || 'incomplete';
    const deadline = (document.getElementById('taskDeadline') as HTMLInputElement)?.value || '';
    const responsiblePerson = (document.getElementById('taskResponsible') as HTMLInputElement)?.value || '';
    const location = (document.getElementById('taskLocation') as HTMLInputElement)?.value || '';

    let additionalFields: any = {};
    if (taskType === 'deadline' && deadline) {
        additionalFields.deadline = new Date(deadline);
    } else if (taskType === 'responsible' && responsiblePerson) {
        additionalFields.responsiblePerson = responsiblePerson;
    } else if (taskType === 'location' && location) {
        additionalFields.location = location;
    }

    taskManager.addTask(taskStatus as TaskStatus, taskType as TaskType, title, description, additionalFields);
    renderTasks();
}

function applyFilter() {
    const statusFilter = (document.getElementById('statusFilter') as HTMLSelectElement).value;
    const typeFilter = (document.getElementById('typeFilter') as HTMLSelectElement).value;

    let filteredTasks = taskManager.getAllTasks();

    if (statusFilter !== 'all') {
        filteredTasks = taskManager.filterTasksByStatus(filteredTasks, statusFilter as TaskStatus);
    }

    if (typeFilter !== 'all') {
        filteredTasks = taskManager.filterTasksByType(filteredTasks, typeFilter as TaskType);
    }

    renderTasks(filteredTasks);
}

function renderTasks(tasks: any[] = taskManager.getAllTasks()) {
    const taskList = document.getElementById('taskList');
    if (!taskList) return;

    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.title} - ${task.status === 'completed' ? 'Выполнено' : 'Не выполнено'}`;

        const typeMapping: { [key in TaskType]: string } = {
            deadline: 'С дедлайном',
            location: 'С местом проведения',
            responsible: 'С ответственным лицом',
            basic: 'Базовая',
        };
        
        // Проверяем тип и добавляем соответствующее значение
        const taskType = task.type as TaskType;
        if (taskType in typeMapping) {
            li.textContent += ` - ${typeMapping[taskType]}`;
        } else {
            li.textContent += ` - ${typeMapping.basic}`;
        }
        
        // Добавляем значение для выбранного типа задачи, если оно существует
        if (task.deadline) li.textContent += ` - Значение: ${task.deadline}`;
        else if (task.location) li.textContent += ` - Значение: ${task.location}`;
        else if (task.responsiblePerson) li.textContent += ` - Значение: ${task.responsiblePerson}`;
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
    const taskTitle = document.getElementById('taskTitle') as HTMLInputElement;
    const taskDescription = document.getElementById('taskDescription') as HTMLInputElement;
    const taskType = document.getElementById('taskType') as HTMLSelectElement;
    const taskStatus = document.getElementById('taskStatus') as HTMLSelectElement;
    const addTaskButton = document.getElementById('addTask') as HTMLButtonElement;
    const applyFilterButton = document.getElementById('applyFilter');
    const taskDeadline = document.getElementById('taskDeadline') as HTMLInputElement;
    const taskResponsible = document.getElementById('taskResponsible') as HTMLInputElement;
    const taskLocation = document.getElementById('taskLocation') as HTMLInputElement;
    // Добавляем события click для кнопок
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
    if (taskType) taskType.addEventListener('change', onChangeTaskType);
});

// Функция для проверки заполненных полей
function checkFields() {
    const taskTitle = document.getElementById('taskTitle') as HTMLInputElement;
    const taskDescription = document.getElementById('taskDescription') as HTMLInputElement;
    const taskType = document.getElementById('taskType') as HTMLSelectElement;
    const taskDeadline = document.getElementById('taskDeadline') as HTMLInputElement;
    const taskResponsible = document.getElementById('taskResponsible') as HTMLInputElement;
    const taskLocation = document.getElementById('taskLocation') as HTMLInputElement;
    const addTaskButton = document.getElementById('addTask') as HTMLButtonElement;

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
    const taskDeadline = document.getElementById('taskDeadline') as HTMLInputElement;
    const taskResponsible = document.getElementById('taskResponsible') as HTMLInputElement;
    const taskLocation = document.getElementById('taskLocation') as HTMLInputElement;
    const taskType = document.getElementById('taskType') as HTMLSelectElement;

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