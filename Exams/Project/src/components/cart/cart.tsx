import { PageName, SnippetInfo } from "../../types/types";
import CartItem from "./cartItem/cartItem";

import './cart.scss'
import { useEffect, useState } from "react";
import { getTomorrowDateInRussian } from "./getTomorrowDate";
import { useCart } from "../../hooks/useCart";
import { startOrder } from "../../constants/constants";
import { generateOrderNumber } from "./succesfulOrder/generateOrderNumber";
import { addOrder } from "./addOrder";

import allDelivery from '../delivery/allDeliveryProducts.json'

type Order = typeof startOrder;

type CartProps = {
    setOrderNumber: (orderNumber: number) => void;
    setCurrentPage: (page: PageName) => void;
    setCurrentOrderInfo: (orderInfo: Order) => void;
};

function Cart({setCurrentPage, setCurrentOrderInfo, setOrderNumber}: CartProps) {
    const { addToCart, removeOneFromCart, removeFromCart, cartItems } = useCart();
    
    const [totalPrice, setTotalPrice] = useState(0);
    const [oldTotalPrice, setOldTotalPrice] = useState(0);

    const [isAllSelected, setIsAllSelected] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const onCheckboxChange = (id: number, isChecked: boolean) => {
        if (isChecked) {
            setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
        } else {
            setSelectedIds((prevSelectedIds) => prevSelectedIds.filter((itemId) => itemId !== id));
        }
    };

    const handleSelectAll = () => {
        if (isAllSelected) {
            // Если все товары уже выбраны, развыбираем их
            setSelectedIds([]);
        } else {
            // Если не все товары выбраны, выбираем все
            const allIds = cartItems.map((item: SnippetInfo) => item.id);
            setSelectedIds(allIds);
        }
        // Переключаем состояние isAllSelected
        setIsAllSelected((prev) => !prev);
    };
    

    const handleClickBuy = async () => {
        const selectedItems: SnippetInfo[] = cartItems.filter((item: SnippetInfo) => selectedIds.includes(item.id));
        const deliveryDate = getTomorrowDateInRussian();
        const deliveryAddress = 'г. Фрязино, ул. Полевая, д. 3';

        const orderInfo = {
            products: selectedItems,
            totalPrice,
            deliveryDate,
            deliveryAddress
        };

        const orderNumber = generateOrderNumber();

        setOrderNumber(orderNumber);
        addOrder(allDelivery, selectedIds, totalPrice, orderNumber);

        for (const id of selectedIds) {
            await removeFromCart(id);
        }

        setCurrentOrderInfo(orderInfo);
        setCurrentPage('succesfulOrder');
    }

    useEffect(() => {
        const selectedItems = cartItems.filter((item: SnippetInfo) => selectedIds.includes(item.id));
        const newTotalPrice = selectedItems.reduce(
            (sum: number, item: SnippetInfo) => sum + (item.price * (item.quantity || 1)),
            0
        );
        const newOldTotalPrice = selectedItems.reduce(
            (sum: number, item: SnippetInfo) => sum + ((item.oldPrice ?? 0) * (item.quantity || 1)),
            0
        );
        setTotalPrice(newTotalPrice);
        setOldTotalPrice(newOldTotalPrice);
    }, [cartItems, selectedIds]);

    return (
        <div className="cart">
            <div className="cart__left-part">
                <div className="cart__top-wrap">
                    <div className="cart__info">
                        <h2 className="cart__title">Корзина</h2>
                        <p className="cart__products-number">5 товаров</p>
                    </div>
                    <a className="cart__select-all-btn" onClick={handleSelectAll}>
                        {isAllSelected ? "Развыбрать все" : "Выбрать все"}
                    </a>
                </div>
                <div className="cart__products-list">
                    {cartItems.map((product: SnippetInfo, index: number) => (
                        <CartItem key={index} product={product} onCheckboxChange={onCheckboxChange} addToCart={addToCart} removeOneFromCart={removeOneFromCart} isChecked={selectedIds.includes(product.id)}/>
                    ))}
                </div>
            </div>
            <div className="cart__right-part">
                <div className="cart__total-price-info">
                    <div className="cart__total-price">
                        <h2 className="cart__total-price-title">Итого</h2>
                        <h2 className="cart__total-price-value">{totalPrice} ₽</h2>
                    </div>
                    <div className="cart__old-total-price">
                        <p className="cart__total-products-number">{selectedIds.length} товаров</p>
                        <p className="cart__old-total-price-value">{oldTotalPrice} ₽</p>
                    </div>
                    <div className="cart__sale">
                        <p className="cart__sale-title">Скидка</p>
                        <p className="cart__total-sale-value">- {Math.abs(oldTotalPrice - totalPrice)} ₽</p>
                    </div>
                    <input type="text" placeholder="Промокод" className="cart__promo-code" />
                    <a className={`cart__buy-btn ${totalPrice === 0 ? 'disabled' : ''}`} onClick={() => handleClickBuy()}>Оплатить {totalPrice} ₽</a>
                </div>
                <p className="cart__pickup">Самовывоз из магазина с {getTomorrowDateInRussian()}</p>
                <p className="cart__pickup-address">г. Фрязино, ул. Полевая, д. 3</p>
            </div>
        </div>
    )
}

export default Cart