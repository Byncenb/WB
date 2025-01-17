import { getCategory } from "./getCategory"
import type { DataCategoryImages } from "../../types/types"
import Category from "./category/category";

import './categories.scss'

function Categories({ searchTerm = '' }: { searchTerm?: string }) {
    const data: DataCategoryImages = getCategory();

    // Фильтрация категорий по searchTerm
    const filteredCategories = data.images.filter(category =>
        category.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    return (
        <>
            {
                filteredCategories.map(element => (
                    <Category key={element.id} category={element} searchTerm={searchTerm} />
                ))
            }
        </>
    );
}
export default Categories