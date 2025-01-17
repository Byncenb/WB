const popularSuggestions = [
    'маска гая фокса', 'циркониевый браслет', 'нефритовый стержень', 'шарф лололошки', 'нож кредитка', 'маска какаши хатаке',
    'массажер мурашка', 'машина времени', 'усы марио'
]

// Фильтруем подсказки на основе введенного текста
export const getFilteredSuggestions = (searchTerm: string) => popularSuggestions.filter(suggestion => {
    const words = suggestion.toLowerCase().split(' ');
    return words.some(word => word.startsWith(searchTerm.toLowerCase()));}).slice(0, 5);