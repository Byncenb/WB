// Функция для подсветки совпадений
export const highlightMatch = (text: string, search: string) => {
    if (!search) return text; // Если нет текста для поиска, возвращаем оригинальный текст
    const parts = text.split(new RegExp(`(${search})`, 'gi')); // Разделяем текст на части
    return parts.map((part, index) => 
        part.toLowerCase() === search.toLowerCase() ? 
        <span key={index} className="highlight">{part}</span> : 
        part
    );
};