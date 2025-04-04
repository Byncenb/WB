import { ColorKey, SnippetInfo } from "../../../types/types"

import SnippetImages from "../../snippets/snippetImages/snippetImages"
import Counter from "./counter/counter";

import './cartItem.scss'
import { COLORS_NAME } from "../../../constants/constants";
import FavoriteIcon from "../../favoriteIcon/favoriteIcon";

type CartItemProps = {
    product: SnippetInfo;
    isChecked: boolean;
    onCheckboxChange: (id: number, isChecked: boolean) => void;
    addToCart: (product: SnippetInfo) => void;
    removeOneFromCart: (productId: number) => void;
}

function CartItem({product, isChecked, onCheckboxChange, addToCart, removeOneFromCart}: CartItemProps) {
    const activeColorKey = (product.colors[0] as ColorKey);
    
    return (
        <div className="cart__product">
            <SnippetImages
            image={product.src}
            name={product.name}
            wrapClassName="cart"
            bg={product.bg}
            />
            <div className="cart__product-wrap">
                <div className="cart__product-info">
                    <p className="cart__product-title">{product.name}</p>
                    <p className="cart__product-color">{COLORS_NAME[activeColorKey]}</p>
                </div>
                <div className="cart__btns-wrap">
                    <Counter product={product} addToCart={addToCart} removeOneFromCart={removeOneFromCart}/>
                    <FavoriteIcon wrapClassName="cart" typeIndex={3}/>
                </div>
            </div>
            <div className="cart__price-info">
                <div className="cart__all-prices">
                    <p className="cart__price">{product.price * product.quantity} ₽</p>
                    <s className="cart__old-price">{(product.oldPrice ?? 0 ) * product.quantity} ₽</s>
                </div>
                <div className="cart__checkbox">
                    <input
                        type="checkbox"
                        id={`checkbox-${product.id}`}
                        checked={isChecked}
                        onChange={(e) => onCheckboxChange(product.id, e.target.checked)}
                        className="hidden-checkbox"
                    />
                    <label htmlFor={`checkbox-${product.id}`} className="custom-checkbox">
                        {isChecked && <span className="checkmark">✓</span>}
                    </label>
                </div>
            </div>
        </div>
    )
}

export default CartItem