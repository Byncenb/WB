// Допустимые системы счисления
type Base = 2 | 10 | 16;

// Перевод числа из строки в десятичное число
function toDecimal(value: string, base: Base): number {
    return parseInt(value, base);
}

// Перевод числа из десятичного в нужную систему счисления
function fromDecimal(value: number, base: Base): string {
    return value.toString(base);
}

// Сложение чисел в разных системах счисления
function add(num1: string, num2: string, base: Base): string {
    const decimal1 = toDecimal(num1, base);
    const decimal2 = toDecimal(num2, base);
    const result = decimal1 + decimal2;
    console.log(`Сложение ${num1} и ${num2} в системе счисления ${base}: ${fromDecimal(result, base)}`);
    return fromDecimal(result, base);
}

// Вычитание чисел в разных системах счисления
function subtract(num1: string, num2: string, base: Base): string {
    const decimal1 = toDecimal(num1, base);
    const decimal2 = toDecimal(num2, base);
    const result = decimal1 - decimal2;
    console.log(`Вычитание ${num1} и ${num2} в системе счисления ${base}: ${fromDecimal(result, base)}`);
    return fromDecimal(result, base);
}

// Умножение чисел в разных системах счисления
function multiply(num1: string, num2: string, base: Base): string {
    const decimal1 = toDecimal(num1, base);
    const decimal2 = toDecimal(num2, base);
    const result = decimal1 * decimal2;
    console.log(`Умножение ${num1} и ${num2} в системе счисления ${base}: ${fromDecimal(result, base)}`);
    return fromDecimal(result, base);
}

// Деления чисел в разных системах счисления
function divide(num1: string, num2: string, base: Base): string {
    const decimal1 = toDecimal(num1, base);
    const decimal2 = toDecimal(num2, base);
    if (decimal2 === 0) {
        console.error("Ошибка: деление на ноль невозможно.");
        return "NaN";
    }
    const result = decimal1 / decimal2; // Целочисленное деление
    console.log(`Деление ${num1} и ${num2} в системе счисления ${base}: ${fromDecimal(result, base)}`);
    return fromDecimal(result, base);
}

// Пример работы калькулятора с различными системами счисления
const num1_bin = "1010"; // двоичное число (10 в десятичной)
const num2_bin = "1101"; // двоичное число (13 в десятичной)

const num1_dec = "15";   // десятичное число
const num2_dec = "30";   // десятичное число

const num1_hex = "A";    // шестнадцатеричное число (10 в десятичной)
const num2_hex = "F";    // шестнадцатеричное число (15 в десятичной)

console.log("--- Операции с двоичными числами ---");
add(num1_bin, num2_bin, 2);
subtract(num1_bin, num2_bin, 2);
multiply(num1_bin, num2_bin, 2);
divide(num1_bin, num2_bin, 2);

console.log("\n--- Операции с десятичными числами ---");
add(num1_dec, num2_dec, 10);
subtract(num1_dec, num2_dec, 10);
multiply(num1_dec, num2_dec, 10);
divide(num1_dec, num2_dec, 10);

console.log("\n--- Операции с шестнадцатеричными числами ---");
add(num1_hex, num2_hex, 16);
subtract(num1_hex, num2_hex, 16);
multiply(num1_hex, num2_hex, 16);
divide(num1_hex, num2_hex, 16);