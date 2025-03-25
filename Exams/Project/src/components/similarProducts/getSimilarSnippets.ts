import { getSnippets } from "../snippets/snippet/getSnippets";

export const getSimilarSnippets = (inputCategoryIds: number[], snippetId: number) => {
    const inputSet = new Set(inputCategoryIds);
    const snippets = getSnippets().snippets;

    return snippets
        .filter(snippet =>
            snippet.categoryIds.some(categoryId => inputSet.has(categoryId)) && snippet.id !== snippetId
        )
        .slice(0, 6);
};