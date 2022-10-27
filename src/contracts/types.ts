export interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
}
export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Order {
  id: string;
  product_id: string;
  user_id: string;
  quantity: number;
  status: string;
}
