export interface User {
    id: string;
    name: string;
    email: string;
    img?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Store {
    id: string;
    name: string;
    address: string;
    img?: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Review {
    id: string;
    userId: string;
    storeId: string;
    rating: number;
    comment: string;
}