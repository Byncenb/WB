import { getImages } from "./getImages"
import type { DataCategoryImages } from "../../types/types"
import Category from "./category/category";

import './categories.scss'

function Categories() {
    const data: DataCategoryImages = getImages();

    return (
        <ul className="categories">
            {
                data.images.map(element => (
                    <Category key={element.id} category={element}/>
                ))
            }
        </ul>
    )
}
export default Categories