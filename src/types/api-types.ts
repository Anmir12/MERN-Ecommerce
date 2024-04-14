import {
  Bar,
  CartItem,
  Line,
  Order,
  Pie,
  Product,
  ShippingInfo,
  Stats,
  User,
} from "./types";

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};
export interface messageResponse {
  success: boolean;
  message: string;
}
export interface allUsersResponse {
  success: boolean;
  users: User[];
}

export interface singleUserResponse {
  success: boolean;
  user: User;
}
export interface userResponse {
  success: boolean;
  user: User;
}

export interface getAllProductsResponse {
  success: boolean;
  products: Product[];
}

export interface getSingleProductResponse {
  success: boolean;
  product: Product;
}

export interface categoriesResponse {
  success: boolean;
  categories: string[];
}

export type searchProductsResponse = getAllProductsResponse & {
  totalPages: number;
};
export interface AllOrdersResponse {
  success: boolean;
  orders: Order[];
}
export interface SingleOrdersResponse {
  success: boolean;
  order: Order;
}

export type statsResponse = {
  success: boolean;
  stats: Stats;
};
export type PieResponse = {
  success: boolean;
  charts: Pie;
};
export type BarResponse = {
  success: boolean;
  charts: Bar;
};
export type LineResponse = {
  success: boolean;
  charts: Line;
};

export type searchProductsRequest = {
  search: string;
  sort: string;
  category: string;
  price: number;
  page: number;
};

export type newProductRequest = {
  id: string;
  formData: FormData;
};
export type updateProductRequest = {
  productId: string;
  userId: string;
  formData: FormData;
};
export type deleteProductRequest = {
  productId: string;
  userId: string;
};

export type newOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItems: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  discount: number;
  shippingCharges: number;
  user: string;
  customername?: string;
  customeraddress?: string;
};
export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};
export type DeleteUserRequest = {
  userId: string;
  adminId: string;
};
