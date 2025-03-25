import SnippetImages from "../snippets/snippetImages/snippetImages";
import { SnippetInfo } from "../../types/types"

import './product.scss'
import Rating from "../rating/Rating";
import ProductColor from "./productColor";
import ProductTable from "./productTable";
import SimilarProducts from "../similarProducts/similarProducts";

import { useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart";

type ProductProps = {
    product: SnippetInfo;
    setCurrentSnippet: (snippet: SnippetInfo) => void;
}

function Product({product, setCurrentSnippet}: ProductProps) {
    const [isOptionsHide, setOptionsHide] = useState(true);

    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        addToCart(product);
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, [product]);

    useEffect(() => {
        // Если isOptionsHide === false, запрещаем скролл
        if (!isOptionsHide) {
            document.body.classList.add('no-scroll');
        } else {
            // Если isOptionsHide === true, восстанавливаем скролл
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isOptionsHide]);

    return (
        <>
            <div className="product">
                    <div className="product__images">
                        <SnippetImages image={product.src} name={product.name} type='' bg={product?.bg} wrapClassName="product"/>
                        <SnippetImages image={product.src} name={product.name} type='' bg={product?.bg} wrapClassName="product"/>
                    </div>
                    <div className="product__info">
                        <h4 className="product__name">{product.name}</h4>
                        <Rating rating={product.rating} folowers={product.folowers} wrapClassName="product"/>
                        <ProductColor colors={product.colors} img={product.src} />
                        <div className="product__price-wrap">
                            <h2 className="product__price">{product.price}</h2>
                            <p className="product__price-currency">₽</p>
                        </div>
                        <div className="product__buttons">
                            <a className="product__buy-btn" onClick={handleAddToCart}>В корзину</a>
                            <img src="/product/emptyHeart.svg" alt="" className="product__add-fav" />
                        </div>
                        <ProductTable product={product}/>
                        <p className="product__show-more" onClick={() => setOptionsHide(false)}>Подробнее</p>
                        <p className="product__description">{product.description}</p>
                    </div>
            </div>
            {!isOptionsHide && (
                <>
                    <div className="overlay" onClick={() => setOptionsHide(true)}></div>
                    <div className="options">
                        <div className="options__top-block">
                            <h3 className="options__name">Параметры</h3>
                            <img src="/product/cross.svg" alt="" className="options__cross" onClick={() => setOptionsHide(true)}/>
                        </div>
                        <ProductTable product={product}/>
                    </div>
                </>
            )}
            <SimilarProducts product={product} setCurrentSnippet={setCurrentSnippet}/>
       </>
    )
}

export default Product