import { getSnippets } from "../snippets/snippet/getSnippets";

export function getSnippetsImages(productsId: number[]) {
    const snippets = getSnippets().snippets;

    if (!snippets || snippets.length === 0) {
        return [];
    }

    return snippets
        .filter(product => productsId.includes(product.id)) // Отфильтровываем нужные товары
        .map(product => ({
            src: product.src,
            bg: product.bg
        }));
}