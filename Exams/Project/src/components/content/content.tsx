import MainBanner from "../mainBanner/mainBanner"
import Categories from "../categories/categories"
import Snippets from "../snippets/snippets"
import Footer from "../footer/footer"

import './content.scss'

function Content() {
    return (
        <div className="content">
            <MainBanner />
            <Categories />
            <Snippets />
            <Footer />
        </div>
    )
}
export default Content