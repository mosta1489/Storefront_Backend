import { expressHandler, Order, OrderWithStatus } from "../contracts/types";
import { OrderModel } from "../models";
import crypto from "crypto";
import {
  GetUserOrdersResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  DeleteOrderParams,
  DeleteOrderResponse,
  GetAllOrdersResponse,
  UpdateOrderParams,
  UpdateOrderResponse,
  AddToOrderRequest,
  AddToOrderResponse,
} from "../contracts/api";

export const getUserOrdersHandler: expressHandler<
  never,
  never,
  GetUserOrdersResponse
> = async (req, res) => {
  const user_id = res.locals.userId;
  const orders = await OrderModel.getUserOrders(user_id);
  return res.status(200).send({ orders });
};

export const createOrderHandler: expressHandler<
  never,
  CreateOrderRequest,
  CreateOrderResponse
> = async (req, res) => {
  const id = crypto.randomUUID();
  const user_id = res.locals.userId;
  const order: Order = { id, user_id };
  await OrderModel.createOrder(order);
  return res.status(200).send({ message: "Order created successfully" });
};

export const addToOrderHandler: expressHandler<
  never,
  AddToOrderRequest,
  AddToOrderResponse
> = async (req, res) => {
  const { orderId, productId, quantity } = req.body;
  await OrderModel.addToOrder(orderId, productId, quantity);
  return res.status(200).send({ message: "Product added successfully" });
};

export const deleteOrderHandler: expressHandler<
  DeleteOrderParams,
  never,
  DeleteOrderResponse
> = async (req, res) => {
  const order_id = req.params.id;
  await OrderModel.deleteOrder(order_id);
  return res.status(200).send({ message: "Order deleted successfully" });
};

export const getAllrOrdersHandler: expressHandler<
  never,
  never,
  GetAllOrdersResponse
> = async (req, res) => {
  const orders = await OrderModel.getAllOrders();
  return res.status(200).send({ orders });
};

export const updateOrderStatusHandler: expressHandler<
  UpdateOrderParams,
  never,
  UpdateOrderResponse
> = async (req, res) => {
  const order_id = req.params.id;
  await OrderModel.updateOrderStatus(order_id);
  return res.status(200).send({ message: "Status updated successfully" });
};
