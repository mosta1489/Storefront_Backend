import DB from "../connection";
import { Order, OrderWithStatus } from "../contracts/types";
export class OrderModelDB {
  async getUserOrders(userId: string): Promise<OrderWithStatus[]> {
    const query = `SELECT * FROM orders WHERE user_id=$1`;
    try {
      const orders = await DB.query(query, [userId]);
      return Promise.resolve(orders.rows);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createOrder(order: Order): Promise<void> {
    const newOrder = [];
    Object.entries(order).forEach(([_, value]) => {
      newOrder.push(value);
    });
    const query = `INSERT INTO orders (id, user_id) VALUES($1,$2)`;
    try {
      await DB.query(query, newOrder);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async addToOrder(
    orderId: string,
    productId: string,
    quantity: number
  ): Promise<void> {
    const query = `INSERT INTO order_products (order_id, product_id, quantity) VALUES($1,$2,$3)`;
    try {
      await DB.query(query, [orderId, productId, quantity]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOrder(order_id: string): Promise<void> {
    const query = `DELETE FROM orders WHERE id=$1`;
    try {
      await DB.query(query, [order_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getAllOrders(): Promise<OrderWithStatus[]> {
    const query = `SELECT * FROM orders `;
    try {
      const orders = await DB.query(query);
      return Promise.resolve(orders.rows);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOrderStatus(order_id: string): Promise<void> {
    const query = `UPDATE orders SET status='complete' WHERE id=$1`;
    try {
      await DB.query(query, [order_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export const OrderModel = new OrderModelDB();
