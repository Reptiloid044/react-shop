export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: ProductSize;
  weight: string;
};

interface ProductSize {
  width: number;
  height: number;
};

export interface InitialStateForProducts {
  error: string;
  loading: boolean;
  products: Array<Product>;
  productsInBasket: Array<Product>;
};
