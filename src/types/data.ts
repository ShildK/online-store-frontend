export interface Product {
    id: Number;
    categoryId: Number;
    tittle: String;
    subtitle: String;
    breand: String;
    image: String;
    price: Number;
}

export interface Category {
    id: Number;
    parentId: Number;
    name: String;
    icon: String;
}