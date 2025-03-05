import MainBanner from "../mainBanner/mainBanner"
import Categories from "../categories/categories"
import Snippets from "../snippets/snippets"

import './home.scss'

type HomeProps = {
    setCurrentPage: (page: 'home' | 'catalog' | 'profile' | 'delivery') => void;
    setCatalogTitle: (title: string) => void;
    setCurrenCatalogId: (id: number) => void;
}

function Home({ setCurrentPage, setCatalogTitle, setCurrenCatalogId }: HomeProps) {
    return (
        <div className="home">
            <MainBanner />
            <ul className="categories">
                <Categories setCurrentPage={setCurrentPage} setCatalogTitle={setCatalogTitle} setCurrenCatalogId={setCurrenCatalogId}/>
            </ul>
            <Snippets />
        </div>
    )
}
export default Home