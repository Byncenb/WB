import { getCategory } from "./getCategory"
import type { DataCategoryImages } from "../../types/types"
import Category from "./category/category";

import './categories.scss'

type CategoriesProps = {
    searchTerm?: string,
    setCurrentPage?: (page: 'home' | 'catalog' | 'profile' | 'delivery') => void;
    setCatalogTitle?: (title: string) => void;
    setIsOpen?: (isOpen: boolean) => void;
    setCurrenCatalogId?: (id: number) => void;
}

function Categories({ searchTerm = '', setCurrentPage, setCatalogTitle, setIsOpen, setCurrenCatalogId }: CategoriesProps) {
    const data: DataCategoryImages = getCategory();

    // Фильтрация категорий по searchTerm
    const filteredCategories = data.images.filter(category =>
        category.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    return (
        <>
            {
                filteredCategories.map(element => (
                    <Category 
                    key={element.id}
                    category={element}
                    searchTerm={searchTerm}
                    setCurrentPage={setCurrentPage}
                    setCatalogTitle={setCatalogTitle}
                    setIsOpen={setIsOpen}
                    setCurrenCatalogId={setCurrenCatalogId}/>
                ))
            }
        </>
    );
}
export default Categories