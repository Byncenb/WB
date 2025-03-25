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
    categoryIds: number[];
    colors: string[];
    brand?: string;
    composition?: string;
    size?: string;
    details?: string;
    temperature?: string;
    productionCountry?: string;
}

export type DataSnippetsInfo = {
    snippets: SnippetInfo[];
}

export type BackgroundColor = 'orange' | 'gray' | 'blue' | 'red';

export type OrderInfo = {
    id: number;
    products: OrderProduct[];
    state: string;
    orderDate: string;
    receiptDate: string;
    buildDate: string;
    totalSum: number;
}

type OrderProduct = {
    id: number;
    rate?: number;
}

export type DataOrdersInfo = {
    orders: OrderInfo[];
}

export type PageName = 'home' | 'catalog' | 'profile' | 'delivery' | 'product';
