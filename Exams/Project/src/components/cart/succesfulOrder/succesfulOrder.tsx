import { PageName, SnippetInfo } from "../../../types/types";
import SnippetImages from "../../snippets/snippetImages/snippetImages";

import './sucessfulOrder.scss'

type SuccesfulOrderProps = {
    products: SnippetInfo[];
    totalPrice: number;
    deliveryDate: string;
    deliveryAddress: string;
    orderNumber: number;
    setCurrentPage: (page: PageName) => void;
    setOrderNumber: (orderNumber: number) => void;
};

function SuccesfulOrder({products, totalPrice, deliveryDate, deliveryAddress, setCurrentPage, orderNumber}: SuccesfulOrderProps) {
    const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);

    return (
       <div className="succesful-order">
            <div className="succesful-order__title-wrap">
                <div className="succesful-order__top-info">
                    <h1 className="succesful-order__title">Заказ оформлен</h1>
                    <img src="/cart/succes.svg" alt="" className="succesful-order__img" />
                </div>
                <p className="succesful-order__order-num">Номер заказа {orderNumber}</p>
            </div>
            <div className="succesful-order__products-info">
                <p className="succesful-order__info">{totalQuantity} товаров · {totalPrice} ₽</p>
                <div className="succesful-order__products-imgs">
                    {
                        products.map((product, index) => (
                            <SnippetImages bg={product.bg} key={index} image={product.src} name={product.name} wrapClassName="succesful-order"/>
                        ))
                    }
                </div>
            </div>
            <div className="succesful-order__delivery-info">
                <p className="succesful-order__delivery-date">Можно будет забрать из магазина с {deliveryDate}</p>
                <p className="succesful-order__delivery-address">{deliveryAddress}</p>
            </div>
            <div className="succesful-order__all-orders" onClick={() => (setCurrentPage('delivery'))}>
                <a className="succesful-order__all-orders-btn">Все заказы</a>
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none">
                    <path d="M1.24023 0.882812L9.24023 8.88281L1.24023 16.8828" stroke="#F94233" strokeWidth="2.5"/>
                </svg>
            </div>
       </div>
    )
}

export default SuccesfulOrder