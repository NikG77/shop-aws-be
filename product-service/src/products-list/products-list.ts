export interface IProduct {
    count: number;
    description: string;
    id: string;
    price: number;
    title: string;
}

export const PRODUCT_BY_ID_MAP = new Map<string, IProduct>([
    [
        '1',
        {
            id: '1',
            title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
            price: 109.95,
            description:
                'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
            count: 7,
        },
    ],
    [
        '2',
        {
            id: '2',
            title: 'Mens Casual Premium Slim Fit T-Shirts',
            price: 22.3,
            description:
                'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
            count: 2,
        },
    ],
    [
        '3',
        {
            id: '3',
            title: 'Mens Cotton Jacket',
            price: 55.99,
            description:
                'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
            count: 4,
        },
    ],
    [
        '4',
        {
            id: '4',
            title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
            price: 695,
            description:
                "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
            count: 1,
        },
    ],

    [
        '5',
        {
            id: '5',
            title: 'Solid Gold Petite Micropave ',
            price: 168,
            description:
                'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.',
            count: 1,
        },
    ],
    [
        '6',
        {
            id: '6',
            title: 'White Gold Plated Princess',
            price: 9.99,
            description:
                "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
            count: 4,
        },
    ],
    [
        '7',
        {
            id: '7',
            title: 'Pierced Owl Rose Gold Plated Stainless Steel Double',
            price: 10.99,
            description: 'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel',
            count: 5,
        },
    ],
]);
