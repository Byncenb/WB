export const handleCardInputChange = (setCardNumber: (card: string) => void, e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
    const formattedInput = input.replace(/(.{4})/g, '$1 ').trim(); // Добавляем пробелы после каждых 4 символов

    setCardNumber(formattedInput.slice(0, 19)); // Ограничиваем длину до 19 символов
};

export const handleDateInputChange = (setDate: (card: string) => void, e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
    const formattedInput = input.length > 2 ? `${input.slice(0, 2)}/${input.slice(2, 4)}` : input; // Форматируем ввод
    setDate(formattedInput.slice(0, 5)); // Ограничиваем длину до 5 символов
};