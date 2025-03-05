export const isFormValid = (cardNumber: string, cardDate: string, cardCVC: string) => {
    return cardNumber && cardDate && cardCVC;  // Если все поля заполнены
  };