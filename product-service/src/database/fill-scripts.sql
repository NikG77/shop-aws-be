CREATE extension if not exists "uuid-ossp";

DROP TABLE IF EXISTS stocks;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    description text,
    price int
);

INSERT INTO
    products (title, description, price)
VALUES
    ('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday', 109),
    ('Mens Casual Premium Slim Fit T-Shirts', 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.', 22),
    ('Mens Cotton Jacket', 'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.', 55),
    ('John Hardy Women Legends Naga Gold & Silver Dragon Station Chain Bracelet', 'From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean`s pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.', 695);
    

CREATE TABLE stocks (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id uuid,
    count int,
    foreign key ("product_id") references "products" ("id")
);

INSERT INTO
    stocks (product_id, count)
VALUES
    ('227445fc-39af-4bb0-95ca-8ca08c683221', 7),
    ('af64622c-58ee-42ab-8b44-2245121d67f6', 2),
    ('1f2ab0f0-185d-4274-8a3d-a24fea2d40cf', 4),
    ('70469211-ca12-454e-8fe3-e2c9884e6ac3', 1);
