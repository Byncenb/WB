export const clearCardInfo = (setCardNumber: (value: string) => void, setCardDate: (value: string) => void, setCardCVC: (value: string) => void) => {
    setCardNumber('');
    setCardDate('');
    setCardCVC('');

    localStorage.setItem('cardNumber', '');
    localStorage.setItem('cardDate', '');
    localStorage.setItem('cardCvc', '');
}