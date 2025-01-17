import { SnippetInfo } from "../../../types/types"
import SnippetImages from "../snippetImages/snippetImages"

import './snippet.scss'

type SnippetProps = {
    snippet: SnippetInfo,
    groupType: number,
}

function Snippet({snippet, groupType}: SnippetProps) {
    if (groupType === 1) {
        return (
            <li className="snippets__snippet">
                <div className="snippets__snippet-imgs-wrap">
                    <SnippetImages image={snippet.src} name={snippet.name} type={snippet?.type} bg={snippet?.bg} />
                </div>
                <div className="snippets__snippet-bottom-info">
                    <div className="snippets__snippet-info">
                        <div className="snippets__snippet-title">
                            <h2 className="snippets__snippet-name">{snippet.name}</h2>
                            <img src="/snippet/icon/heart.svg" alt="" className="snippets__add-fav" />
                        </div>
                        <p className="snippets__snippet-description">{snippet.description}</p>
                    </div>
                    <div className="snippets__buy-wrap">
                        <div className="snippets__buy-wrap-info">
                            <div className="snippets__snippet-prices">
                                <h4 className="snippets__snippet-price">{snippet.price} ₽</h4>
                                { snippet.oldPrice && (
                                    <p className="snippets__snippet-old-price">{snippet.oldPrice} ₽</p>
                                )}
                            </div>
                            <div className="snippets__user-rating">
                                <div className="snippets__snippet-rating">
                                    <p className="snippets__snippet-rating-value">{snippet.rating}</p>
                                    <img src="/snippet/icon/black-star.svg" alt="" className="snippets__snippet-rating-star" />
                                </div>
                                <div className="snippets__snippet-folowers">
                                    <p className="snippets__snippet-folowers-value">{snippet.folowers}</p>
                                    <img src="/snippet/icon/black-heart.svg" alt="" className="snippets__snippet-folowers-heart" />
                                </div>
                            </div>
                        </div>
                        <a className="snippets__buy-btn">В корзину</a>
                    </div>
                </div>
            </li>
        )
    } else {
        return (
            <li className="snippets__small-snippet">
                <SnippetImages image={snippet.src} name={snippet.name} bg={snippet?.bg} groupType={groupType}/>
                <img src="/snippet/icon/lighter-heart.svg" alt="" className="snippets__add-fav" />
                <div className="snippets__snippet-bottom-info">
                    <div className="snippets__buy-wrap">
                        <div className="snippets__buy-wrap-info">
                            <div className="snippets__snippet-prices">
                                <h4 className="snippets__snippet-price">{snippet.price} ₽</h4>
                                { snippet.oldPrice && (
                                    <p className="snippets__snippet-old-price">{snippet.oldPrice} ₽</p>
                                )}
                            </div>
                            <div className="snippets__user-rating">
                                <div className="snippets__snippet-rating">
                                    <p className="snippets__snippet-rating-value">{snippet.rating}</p>
                                    <img src="/snippet/icon/white-star.svg" alt="" className="snippets__snippet-rating-star" />
                                </div>
                                <div className="snippets__snippet-folowers">
                                    <p className="snippets__snippet-folowers-value">{snippet.folowers}</p>
                                    <img src="/snippet/icon/white-heart.svg" alt="" className="snippets__snippet-folowers-heart" />
                                </div>
                            </div>
                        </div>
                        <p className="snippets__snippet-description">{snippet.name}</p>
                        <a className="snippets__buy-btn">В корзину</a>
                    </div>
                </div>
            </li>
        )
    }
}

export default Snippet