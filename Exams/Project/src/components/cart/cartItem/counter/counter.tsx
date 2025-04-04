import { SnippetInfo } from '../../../../types/types';

import './counetr.scss'

type CounterProps = {
    product: SnippetInfo;
    addToCart: (product: SnippetInfo) => void;
    removeOneFromCart: (productId: number) => void;
}

function Counter({product, addToCart, removeOneFromCart}: CounterProps) {
    return (
        <div className="cart__counter">
            <a className="cart__counter-del" onClick={() => removeOneFromCart(product.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M14 7L0 7" stroke="black" strokeWidth="2"/>
                </svg>
            </a>
            <p className="cart__counter-value">{product.quantity}</p>
            <a className="cart__counter-add" onClick={() => addToCart(product)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 0L7 14" stroke="black" strokeWidth="2"/>
                    <path d="M14 7L4.17233e-07 7" stroke="black" strokeWidth="2"/>
                </svg>
            </a>
        </div>
    )
}

export default Counter