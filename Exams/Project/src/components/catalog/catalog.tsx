import Snippet from "../snippets/snippet/snippet";
import NotFound from "../notFound/notFound";

import { SnippetInfo } from "../../types/types"
import { getSnippets } from "../snippets/snippet/getSnippets"

import './catalog.scss'

type CatalogProps = {
    title: string,
    categoryId?: number,
}

function Catalog({ title, categoryId }: CatalogProps) {
    const snippets = getSnippets().snippets;
    let filteredSnippets = snippets;
    if (categoryId) {
        filteredSnippets = snippets.filter(snippet => snippet.categoryId.includes(categoryId));
    } else {
        filteredSnippets = snippets.filter(snippet => snippet.name.toLowerCase().includes(title.toLowerCase()));
    }

    scrollTo(0, 0);

    return (
        <div className="catalog">
            <div className="catalog__info">
                <h3 className="catalog__title">{title}</h3>
                {!!filteredSnippets.length && (
                    <p className="catalog__products-value">{filteredSnippets.length} товаров</p>
                )}
            </div>
            {!!filteredSnippets.length && (
                <>
                    <div className="catalog__filters"></div>
                    <div className="snippets">
                        {filteredSnippets.map((element: SnippetInfo) => (
                            <Snippet key={element.id} snippet={element} />
                        ))}
                    </div>
                </>
            )}
            {!filteredSnippets.length && (
                <NotFound />
            )}
        </div>
    )
}

export default Catalog