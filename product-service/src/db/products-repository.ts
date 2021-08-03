import { PRODUCTS } from "./products";

export function findProducts() {
  return Promise.resolve(PRODUCTS);
}

export async function findProductById(productId: string) {
  const products = await findProducts();

  return products.find(({ id }) => productId === id);
}
