export const handleBindClick = (cardNumber: string, date: string, cvc: string, setIsButtonVisible: (isCvcVisible: boolean) => void) => {
    localStorage.setItem('cardNumber', cardNumber);
    localStorage.setItem('cardDate', date);
    localStorage.setItem('cardCvc', cvc);

    setIsButtonVisible(false);
};