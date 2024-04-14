export type User = {
  name: string;
  email: string;
  dob: string;
  _id: string;
  photo: string;
  gender: string;
  role: string;
};

export type Product = {
  name: string;
  price: number;
  stock: number;
  category: string;
  _id: string;
  photo: string;
};

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  name?: string;
};
export type CartItem = {
  name: string;
  price: number;
  photo: string;
  quantity: number;
  stock: number;
  productId: string;
};

export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

export type Order = {
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};
export type changeAndCount = {
  revenue: number;
  users: number;
  orders: number;
  products: number;
};
export type LatestTransaction = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};
export type Stats = {
  categoryCount: Record<string, number>[];
  changePercentage: changeAndCount;
  count: changeAndCount;
  charts: {
    orders: number[];
    revenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestTransactions: LatestTransaction[];
};
export type OrderFullFillment = {
  process: number;
  shipping: number;
  delivered: number;
};

export type RevenueDistribution = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};

export type UserAgeGroup = {
  teen: number;
  adult: number;
  old: number;
};
export type Pie = {
  orderFullFillmentRatio: OrderFullFillment;
  ProductCategories: Record<string, number>[];
  productStock: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: RevenueDistribution;
  userAgeGroup: UserAgeGroup;
  adminCustomer: {
    admin: number;
    customer: number;
  };
};
export type Bar = {
  users: number[];
  products: number[];
  orders: number[];
};
export type Line = {
  users: number[];
  products: number[];
  discount: number[];
  revenue: number[];
};
