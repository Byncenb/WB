import MainBanner from "../mainBanner/mainBanner"
import Categories from "../categories/categories"
import Snippets from "../snippets/snippets"

import './home.scss'
import { PageName, SnippetInfo } from "../../types/types"

type HomeProps = {
    setCurrentPage: (page: PageName) => void;
    setCatalogTitle: (title: string) => void;
    setCurrenCatalogId: (id: number) => void;
    setCurrentSnippet: (snippet: SnippetInfo) => void;
}

function Home({ setCurrentPage, setCatalogTitle, setCurrenCatalogId, setCurrentSnippet }: HomeProps) {
    return (
        <div className="home">
            <MainBanner />
            <ul className="categories">
                <Categories setCurrentPage={setCurrentPage} setCatalogTitle={setCatalogTitle} setCurrenCatalogId={setCurrenCatalogId}/>
            </ul>
            <Snippets setCurrentPage={setCurrentPage} setCurrentSnippet={setCurrentSnippet}/>
        </div>
    )
}
export default Home