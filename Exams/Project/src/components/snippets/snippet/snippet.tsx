import { useCart } from "../../../hooks/useCart";
import { PageName, SnippetInfo } from "../../../types/types"
import FavoriteIcon from "../../favoriteIcon/favoriteIcon";
import Rating from "../../rating/Rating";
import SnippetImages from "../snippetImages/snippetImages"

import './snippet.scss'

type SnippetProps = {
    snippet: SnippetInfo,
    groupType?: number,
    setCurrentPage?: (page: PageName) => void;
    setCurrentSnippet: (snippet: SnippetInfo) => void;
    wrapClassName?: string;
}

function Snippet({snippet, groupType, setCurrentPage, setCurrentSnippet, wrapClassName='snippets'}: SnippetProps) {
    const handleSnippetClick = (snippet: SnippetInfo) => {
        setCurrentPage?.('product');
        setCurrentSnippet(snippet);
    }

    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        addToCart(snippet);
    };

    if (groupType === 1) {
        return (
            <div className={`${wrapClassName}__snippet`} onClick={() => handleSnippetClick(snippet)}>
                <div className={`${wrapClassName}__snippet-imgs-wrap`}>
                    <SnippetImages image={snippet.src} name={snippet.name} type={snippet?.type} bg={snippet?.bg} wrapClassName={wrapClassName}/>
                </div>
                <div className={`${wrapClassName}__snippet-bottom-info`}>
                    <div className={`${wrapClassName}__snippet-info`}>
                        <div className={`${wrapClassName}__snippet-title`}>
                            <h2 className={`${wrapClassName}__snippet-name`}>{snippet.name}</h2>
                            <FavoriteIcon wrapClassName={wrapClassName} typeIndex={1}/>                        </div>
                        <p className={`${wrapClassName}__snippet-description`}>{snippet.description}</p>
                    </div>
                    <div className={`${wrapClassName}__buy-wrap`}>
                        <div className={`${wrapClassName}__buy-wrap-info`}>
                            <div className={`${wrapClassName}__snippet-prices`}>
                                <h4 className={`${wrapClassName}__snippet-price`}>{snippet.price} ₽</h4>
                                { snippet.oldPrice && (
                                    <s className={`${wrapClassName}__snippet-old-price`}>{snippet.oldPrice} ₽</s>
                                )}
                            </div>
                            <Rating rating={snippet.rating} folowers={snippet.folowers}  />
                        </div>
                        <a className={`${wrapClassName}__buy-btn`} onClick={handleAddToCart}>В корзину</a>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={`${wrapClassName}__small-snippet`} onClick={() => handleSnippetClick(snippet)}>
                <SnippetImages image={snippet.src} name={snippet.name} bg={snippet?.bg} groupType={groupType} wrapClassName={wrapClassName}/>
                <FavoriteIcon wrapClassName={wrapClassName} typeIndex={0}/>
                <div className={`${wrapClassName}__snippet-bottom-info`}>
                    <div className={`${wrapClassName}__buy-wrap`}>
                        <div className={`${wrapClassName}__buy-wrap-info`}>
                            <div className={`${wrapClassName}__snippet-prices`}>
                                <h4 className={`${wrapClassName}__snippet-price`}>{snippet.price} ₽</h4>
                                { snippet.oldPrice && (
                                    <s className={`${wrapClassName}__snippet-old-price`}>{snippet.oldPrice} ₽</s>
                                )}
                            </div>
                            <div className={`${wrapClassName}__user-rating`}>
                                <div className={`${wrapClassName}__snippet-rating`}>
                                    <p className={`${wrapClassName}__snippet-rating-value`}>{snippet.rating}</p>
                                    <img src="/snippet/icon/white-star.svg" alt="" className={`${wrapClassName}__snippet-rating-star`} />
                                </div>
                                <div className={`${wrapClassName}__snippet-folowers`}>
                                    <p className={`${wrapClassName}__snippet-folowers-value`}>{snippet.folowers}</p>
                                    <img src="/snippet/icon/white-heart.svg" alt="" className={`${wrapClassName}__snippet-folowers-heart`} />
                                </div>
                            </div>
                        </div>
                        <p className={`${wrapClassName}__snippet-description`}>{snippet.name}</p>
                        <a className={`${wrapClassName}__buy-btn`} onClick={handleAddToCart}>В корзину</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Snippet