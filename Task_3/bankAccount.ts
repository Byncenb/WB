// Интерфейс банковского счета
interface Account {
    accountNumber: string;
    balance: number;

    deposit(amount: number): void;
    withdraw(amount: number): void;
    checkBalance(): number;
}

// Класс для дебетового счета
class DebitAccount implements Account {
    accountNumber: string;
    balance: number;

    constructor(accountNumber: string, initialBalance: number) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    // Пополнение счета
    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Депозит на сумму ${amount} выполнен. Текущий баланс: ${this.balance}`);
        } else {
            console.log('Сумма депозита должна быть положительной.');
        }
    }

    // Снятие средств
    withdraw(amount: number): void {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Снятие на сумму ${amount} выполнено. Текущий баланс: ${this.balance}`);
        } else {
            console.log('Недостаточно средств для снятия или неверная сумма.');
        }
    }

    // Проверка баланса
    checkBalance(): number {
        console.log(`Текущий баланс дебетового счета: ${this.balance}`);
        return this.balance;
    }
}

// Класс для кредитного счета
class CreditAccount implements Account {
    accountNumber: string;
    balance: number;
    creditLimit: number;
    debt: number;

    constructor(accountNumber: string, creditLimit: number) {
        this.accountNumber = accountNumber;
        this.balance = 0;
        this.creditLimit = creditLimit;
        this.debt = 0;
    }

    // Пополнение счета
    deposit(amount: number): void {
        if (amount > 0) {
            if (this.debt > 0) {
                const repayment = Math.min(this.debt, amount);
                this.debt -= repayment;
                this.balance += amount - repayment;
                console.log(`Погашение долга на сумму ${repayment}. Остаток долга: ${this.debt}. Текущий баланс: ${this.balance}`);
            } else {
                this.balance += amount;
                console.log(`Депозит на сумму ${amount} выполнен. Текущий баланс: ${this.balance}`);
            }
        } else {
            console.log('Сумма депозита должна быть положительной.');
        }
    }

    // Снятие средств с учетом кредитного лимита
    withdraw(amount: number): void {
        if (amount > 0 && this.balance + (this.creditLimit - this.debt) >= amount) {
            if (amount <= this.balance) {
                this.balance -= amount;
                console.log(`Снятие на сумму ${amount} выполнено. Текущий баланс: ${this.balance}`);
            } else {
                const creditAmount = amount - this.balance;
                this.debt += creditAmount;
                this.balance = 0;
                console.log(`Снятие на сумму ${amount} выполнено. Использован кредит: ${creditAmount}. Текущий долг: ${this.debt}`);
            }
        } else {
            console.log('Превышен кредитный лимит или неверная сумма.');
        }
    }

    // Проверка баланса и долга
    checkBalance(): number {
        console.log(`Текущий баланс кредитного счета: ${this.balance}. Текущий долг: ${this.debt}`);
        return this.balance;
    }
}

// Демонстрация работы системы

// Создаем дебетовый счет с начальным балансом 1000
const myDebitAccount = new DebitAccount('DEB12345', 1000);
myDebitAccount.checkBalance();
myDebitAccount.deposit(700);
myDebitAccount.withdraw(300);
myDebitAccount.checkBalance();

// Создаем кредитный счет с кредитным лимитом 2000
const myCreditAccount = new CreditAccount('CRD12345', 2000);
myCreditAccount.checkBalance();
myCreditAccount.deposit(200);
myCreditAccount.withdraw(600);
myCreditAccount.withdraw(1000);
myCreditAccount.checkBalance();
myCreditAccount.deposit(1500);
myCreditAccount.checkBalance();