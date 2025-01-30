import MainBanner from "../mainBanner/mainBanner"
import Categories from "../categories/categories"
import Snippets from "../snippets/snippets"

import './home.scss'

function Home() {
    return (
        <div className="home">
            <MainBanner />
            <ul className="categories">
                <Categories />
            </ul>
            <Snippets />
        </div>
    )
}
export default Home