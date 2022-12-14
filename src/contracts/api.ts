import { User, Product, Order, OrderWithStatus } from "./types";

// ===================================================
// user API
export type SignUpRequest = Pick<
  User,
  "username" | "firstname" | "lastname" | "password"
>;
export interface SignupResponse {
  message: string;
}

export interface SignInRequest {
  username: string;
  password: string;
}
export interface SigninResponse {
  user: Pick<User, "username" | "firstname" | "lastname" | "id">;
  jwt: string;
}

export interface AllUserRequest {}
export interface AllUserResponse {
  users: Pick<User, "id">[];
}

export interface DeleteUserRequest {}
export interface DeleteUserParams {
  id: string;
}
export interface DeleteUserResponse {
  message: string;
}

export interface MakeAdminRequest {
  secret: string;
}
export interface MakeAdminResponse {
  jwt: string;
}

// ===================================================

// Product API

// -----------------------------------------

export interface GetAllProductsReqest {}
export interface GetAllProductsResponse {
  products: Product[];
}

// -----------------------------------------

export interface ShowProductRequest {}
export interface ShowProductParams {
  id: string;
}
export interface ShowProductResponse {
  product: Product;
}

// -----------------------------------------

export type CreteProductRequest = Pick<Product, "name" | "price">;
export interface CreteProductResponse {
  message: string;
}

// -----------------------------------------

// ===================================================
// order API

// -----------------------------------------

export interface GetUserOrdersRequest {}
export interface GetUserOrdersResponse {
  orders: OrderWithStatus[];
}

// -----------------------------------------

export type CreateOrderRequest = {};
export interface CreateOrderResponse {
  message: string;
}

// -----------------------------------------

export interface AddToOrderRequest {
  orderId: string;
  productId: string;
  quantity: number;
}
export interface AddToOrderResponse {
  message: string;
}

// -----------------------------------------

export interface DeleteOrderRequest {}
export interface DeleteOrderParams {
  id: string;
}
export interface DeleteOrderResponse {
  message: string;
}

// -----------------------------------------

export interface GetAllOrdersRequest {}
export interface GetAllOrdersResponse {
  orders: OrderWithStatus[];
}

// -----------------------------------------

export interface UpdateOrderRequest {}
export interface UpdateOrderParams {
  id: string;
}
export interface UpdateOrderResponse {
  message: string;
}

// -----------------------------------------
