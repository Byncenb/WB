export type CategoryImage = {
    name: string;
    src: string;
    id: number;
}

export type DataCategoryImages = {
    images: CategoryImage[];
}

export type SnippetInfo = {
    id: number;
    src: string;
    name: string;
    description: string;
    price: number;
    oldPrice?: number;
    rating: string;
    folowers: number;
    type?: string;
    bg?: string;
}

export type DataSnippetsInfo = {
    snippets: SnippetInfo[];
}

export type BackgroundColor = 'orange' | 'gray' | 'blue' | 'red';
