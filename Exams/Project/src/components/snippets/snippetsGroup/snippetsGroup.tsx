import { PageName, SnippetInfo } from "../../../types/types"

import Snippet from "../snippet/snippet"

import './snippetsGroup.scss'

type SnippetsGroupProps = {
    snippets: SnippetInfo[],
    title?: string,
    groupType: number,
    setCurrentPage: (page: PageName) => void;
    setCurrentSnippet: (snippet: SnippetInfo) => void;
}

function SnippetsGroup({ snippets, title, groupType, setCurrentPage, setCurrentSnippet }: SnippetsGroupProps) {
    const className = groupType === 1 ? 'snippets__snippets-group-list' : 'snippets__small-snippets-group-list';
    const classNameWrapper = groupType === 1 ? 'snippets__snippets-group-wrapper' : 'snippets__small-snippets-group-wrapper';
    return (
        <div className="snippets__snippets-group">
            <div className={classNameWrapper}>
                <img src={title} alt="" className="snippets__snippets-group-title" />
                {
                    <ul className={className}>
                        {snippets.map((element: SnippetInfo) => (
                            <Snippet setCurrentPage={setCurrentPage} setCurrentSnippet={setCurrentSnippet} key={element.id} snippet={element} groupType={groupType} />
                        ))}
                    </ul>
                }
            </div>
        </div>
    )
}

export default SnippetsGroup