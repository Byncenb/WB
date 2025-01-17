import type { DataCategoryImages } from "../../types/types";
import data from "./allCategories.json"

export const getCategory = (): DataCategoryImages => {
    const items = data.items.map(item => ({
        name: item.name,
        src: item.src,
        id: item.id
    }));
    return { images: items };
}