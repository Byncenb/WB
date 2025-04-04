export function getTomorrowDateInRussian(): string {
    const today = new Date();

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const monthsInRussian = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];

    const day = tomorrow.getDate();
    const monthIndex = tomorrow.getMonth();

    return `${day} ${monthsInRussian[monthIndex]}`;
}