import { PageName, SnippetInfo } from "../../types/types";
import { getSnippets } from "./snippet/getSnippets"
import { allSnippetsGroups } from "./snippetsGroup/allSnippetsGroups";

import SnippetsGroup from "./snippetsGroup/snippetsGroup";

import './snippets.scss'

type SnippetsProps = {
    setCurrentPage: (page: PageName) => void;
    setCurrentSnippet: (snippet: SnippetInfo) => void;
}

function Snippets({setCurrentPage, setCurrentSnippet}: SnippetsProps) {
    const data = getSnippets();
    
    return (
        <div className="snippets">
            {allSnippetsGroups.map(snippetsGroup => {
                const snippetsForGroup = data.snippets.filter((snippet: SnippetInfo) => {
                    return snippetsGroup.snippetsId.includes(snippet.id);
                });

                return (
                    <SnippetsGroup 
                        key={snippetsGroup.id} 
                        snippets={snippetsForGroup} 
                        title={snippetsGroup.titleSrc}
                        groupType={snippetsGroup.groupType}
                        setCurrentPage={setCurrentPage}
                        setCurrentSnippet={setCurrentSnippet}
                    />
                );
            })}
        </div>
    );
}

export default Snippets