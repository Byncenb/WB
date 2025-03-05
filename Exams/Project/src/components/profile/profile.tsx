import { useState, useEffect } from "react";
import { handleCardInputChange, handleDateInputChange } from "./getFormattedInputs";

import './profile.scss'
import { handleInputChange } from "./setValue";
import { handleBindClick } from "./saveCardInfo";
import { clearCardInfo } from "./clearCardInfo";
import { toggleCvcVisibility } from "./toggleCsvVisibility";
import { isFormValid } from "./isFormaValid";

function Profile() {
    // Состояния для данных карты
    const [cardNumber, setCardNumber] = useState('');
    const [cardDate, setCardDate] = useState('');
    const [cardCVC, setCardCVC] = useState('');

    const [isCvcVisible, setIsCvcVisible] = useState(false);

    const [isButtonVisible, setIsButtonVisible] = useState(true);

    // Состояния для каждого инпута
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    // Загрузка данных из localStorage при монтировании компонента
    useEffect(() => {
        const savedName = localStorage.getItem('profileName');
        const savedPhone = localStorage.getItem('profilePhone');
        const savedEmail = localStorage.getItem('profileEmail');

        const savedCardNumber = localStorage.getItem('cardNumber');
        const savedCardDate = localStorage.getItem('cardDate');
        const savedCardCvc = localStorage.getItem('cardCvc');

        if (savedName) setName(savedName);
        if (savedPhone) setPhone(savedPhone);
        if (savedEmail) setEmail(savedEmail);

        if (savedCardNumber) setCardNumber(savedCardNumber);
        if (savedCardDate) setCardDate(savedCardDate);
        if (savedCardCvc) setCardCVC(savedCardCvc);
    }, []);

    // Сохранение данных в localStorage при изменении состояния
    useEffect(() => {
        localStorage.setItem('profileName', name);
    }, [name]);

    useEffect(() => {
        localStorage.setItem('profilePhone', phone);
    }, [phone]);

    useEffect(() => {
        localStorage.setItem('profileEmail', email);
    }, [email]);

    return (
        <div className="profile">
            <div className="profile__profile-info">
                <h2 className="profile__profile-info-title">Профиль</h2>
                <input 
                    type="text"
                    className="profile__input profile__input-name"
                    placeholder="Иван"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                <input
                    type="tel"
                    className="profile__input profile__input-phone"
                    placeholder="79019074482"
                    maxLength={11}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}/>
                <input
                    type="text"
                    className="profile__input profile__input-mail"
                    placeholder="example@mail.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="profile__card-info">
                <div className="profile__card-info-title-wrapper">
                    <h2 className="profile__card-info-title">Карта</h2>
                    <img
                        src="/profile/cart.svg"
                        alt="Стереть"
                        className="profile__card-info-cart"
                        onClick={() => clearCardInfo(setCardNumber, setCardDate, setCardCVC)}/>
                </div>
                <input
                    type="text"
                    className="profile__input profile__input-card-number"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => handleCardInputChange(setCardNumber, e)}/>
                <div className="profile__card-info-wrapper">
                    <input
                        type="text"
                        className="profile__input profile__input-card-date"
                        placeholder="ММ/ГГ"
                        value={cardDate}
                        onChange={(e) => handleDateInputChange(setCardDate, e)}/>
                    <div className="profile__input-card-cvc-wrapper">
                        <input
                            type={isCvcVisible ? 'text' : 'password'}
                            className="profile__input profile__input-card-cvc"
                            placeholder="CVC/CVV"
                            maxLength={3}
                            value={cardCVC}
                            onChange={(e) => handleInputChange(setCardCVC, e)}/>
                        <img
                            src={isCvcVisible ? "/profile/open-eye.svg" : "/profile/close-eye.svg"}
                            alt="Скрыть/Показать"
                            className="profile__input-card-img"
                            onClick={() => toggleCvcVisibility(setIsCvcVisible, isCvcVisible)}/>
                    </div>
                </div>
                {isButtonVisible && (
                    <a
                        className={isFormValid(cardNumber, cardDate, cardCVC) ? "profile__card-info-btn profile__card-info-btn_active" : "profile__card-info-btn"}
                        onClick={() => handleBindClick(cardNumber, cardDate, cardCVC, setIsButtonVisible)}
                    >Привязать</a>
                )}
            </div>
        </div>
    )
}

export default Profile;