import { RequestHandler } from "express";

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
  user_id: string;
}
export type OrderWithStatus = Order & { status: string };

type withError<T> = T & { error: string };
export type expressHandler<Params, Req, Res> = RequestHandler<
  Partial<Params>,
  Partial<withError<Res>>,
  Partial<Req>
>;

export interface JwtPayload {
  userId: string;
  isAdmin: boolean;
}
