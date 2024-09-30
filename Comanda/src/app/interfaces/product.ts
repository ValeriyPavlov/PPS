export interface Product {
    id: string;
    description: string;
    img1: string;
    img2: string;
    img3: string;
    price: number;
    prodTime: number;
    type: string;
    amount: number;
    ready: boolean;
}

export interface Order{
    id: string;
    totalPrice: number;
    prodTime: number;
    products: Product[];
    state: string;
    userId: string;
    tableId: string;
    encuesta: boolean;
}