import type { DataSnippetsInfo } from "../../../types/types";
import data from "./allSnippets.json"

export const getSnippets = (): DataSnippetsInfo => {
    const items = data.items.map(item => ({
        id: item.id,
        name: item.name,
        src: item.src,
        description: item.description,
        price: item.price,
        oldPrice: item?.oldPrice,
        rating: item.rating,
        folowers: item.folowers,
        type: item?.type,
        bg: item?.bg || undefined,
        categoryId: item.categoryId,
    }));
    return { snippets: items };
}   