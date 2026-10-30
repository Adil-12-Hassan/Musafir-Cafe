export declare enum DrinkSize {
    MEDIUM = "medium",
    LARGE = "large"
}
export declare enum DrinkCategory {
    ICED_COFFEE = "iced_coffee",
    HOT_COFFEE = "hot_coffee",
    SPECIAL = "special"
}
export declare class MenuItem {
    id: number;
    name: string;
    description: string;
    category: string;
    priceM: number;
    priceL: number;
    ingredients: string[];
    available: boolean;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}
