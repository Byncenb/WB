import { SnippetInfo } from "../../types/types";
import Snippet from "../snippets/snippet/snippet";
import { getSimilarSnippets } from "./getSimilarSnippets";

import './similarProducts.scss'

type SimilarProductsProps = {
    product: SnippetInfo;
    setCurrentSnippet: (snippet: SnippetInfo) => void;
}

function SimilarProducts({product, setCurrentSnippet}: SimilarProductsProps) {
    const similarProducts = getSimilarSnippets(product.categoryIds, product.id);

    return (
        <>
            {similarProducts.length > 0 && (
                <div className="similar-products">
                    <img
                        src="/similarProducts/Похожие.png"
                        alt="Похожие товары"
                        className="similar-products__title"
                    />
                    <div className="similar-products__wrap">
                        {similarProducts.map((product, index) => (
                            <Snippet key={index} snippet={product} setCurrentSnippet={setCurrentSnippet} wrapClassName="similar-products"/>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default SimilarProducts