"use strict";
// Класс для управления расходами
class ExpenseManager {
    constructor() {
        this.expenses = []; // Список всех расходов
        this.categories = new Set(); // Уникальные категории расходов
        this.loadFromStorage();
    }
    // Добавление нового расхода
    addExpense(category, amount, date) {
        const expense = {
            id: this.generateId(),
            category,
            amount,
            date: new Date(date),
        };
        this.expenses.push(expense);
        this.categories.add(category);
        this.saveToStorage();
    }
    // Получение отчета по категориям
    getCategoryReports() {
        const report = [];
        this.categories.forEach(category => {
            // Суммируем расходы для каждой категории
            const totalAmount = this.expenses
                .filter(expense => expense.category === category)
                .reduce((sum, expense) => sum + expense.amount, 0);
            report.push({ category, totalAmount });
        });
        return report;
    }
    // Получение общего отчета по всем расходам
    getExpenseReport() {
        const totalAmount = this.expenses.reduce((sum, expense) => sum + expense.amount, 0); // Общая сумма всех расходов
        // Уникальные дни с расходами
        const uniqueDates = new Set(this.expenses.map(expense => expense.date.toISOString().slice(0, 10)));
        const daysCount = uniqueDates.size || 1;
        // Уникальные месяцы с расходами
        const uniqueMonths = new Set(this.expenses.map(expense => {
            const date = expense.date;
            return `${date.getFullYear()}-${date.getMonth()}`;
        }));
        const monthsCount = uniqueMonths.size || 1; // Количество уникальных месяцев (минимум 1)
        return {
            totalAmount,
            averagePerDay: totalAmount / daysCount,
            averagePerMonth: totalAmount / monthsCount,
        };
    }
    // Получение списка расходов за определенный период
    getExpensesByDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return this.expenses.filter(expense => expense.date >= start && expense.date <= end); // Фильтрация расходов по дате
    }
    // Сохранение данных в localStorage
    saveToStorage() {
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
    }
    // Загрузка данных из localStorage
    loadFromStorage() {
        const data = localStorage.getItem('expenses');
        if (data) {
            try {
                this.expenses = JSON.parse(data).map((expense) => ({
                    ...expense,
                    date: new Date(expense.date),
                }));
                this.expenses.forEach(exp => this.categories.add(exp.category));
            }
            catch {
                console.error('Ошибка при загрузке данных из localStorage');
                this.expenses = [];
            }
        }
    }
    // Генерация уникального ID для расхода
    generateId() {
        return String(Date.now());
    }
}
// Создание экземпляра менеджера расходов
const manager = new ExpenseManager();
const expenseForm = document.getElementById('expense-form');
const categoryInput = document.getElementById('category');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const outputDiv = document.getElementById('output');
// Отображение отчета по категориям
document.getElementById('show-category-report').addEventListener('click', () => {
    const reports = manager.getCategoryReports();
    outputDiv.innerHTML = `<h3>Отчет по категориям</h3>` +
        `<table>${reports.map(report => `<tr><td>${report.category}</td><td>${report.totalAmount}</td></tr>`).join('')}</table>`;
});
// Отображение общего отчета
document.getElementById('show-expense-report').addEventListener('click', () => {
    const report = manager.getExpenseReport();
    outputDiv.innerHTML = `
        <h3>Общий отчет</h3>
        <p>Общая сумма: ${report.totalAmount.toFixed(3)}</p>
        <p>Среднее за день: ${report.averagePerDay.toFixed(3)}</p>
        <p>Среднее за месяц: ${report.averagePerMonth.toFixed(3)}</p>`;
});
// Фильтрация расходов по дате
document.getElementById('filter-by-date').addEventListener('click', () => {
    const startDate = prompt('Начальная дата (YYYY-MM-DD):');
    const endDate = prompt('Конечная дата (YYYY-MM-DD):');
    if (startDate && endDate) {
        const expenses = manager.getExpensesByDateRange(startDate, endDate); // Получаем расходы за период
        outputDiv.innerHTML = `<h3>Расходы с ${startDate} по ${endDate}</h3>` +
            `<ul>${expenses.map(exp => `<li>${exp.date.toDateString()} - ${exp.category}: ${exp.amount}</li>`).join('')}</ul>`;
    }
});
// Обработка добавления нового расхода
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const category = categoryInput.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;
    manager.addExpense(category, amount, date);
    // Очистка полей ввода
    categoryInput.value = '';
    amountInput.value = '';
    dateInput.value = '';
});
