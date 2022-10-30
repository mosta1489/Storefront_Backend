import DB from "../connection";
import { Product } from "../contracts/types";
class ProductModelDB {
  async getAllProducts(): Promise<Product[]> {
    const query = `SELECT * FROM products`;
    try {
      const allProducts = await DB.query(query);
      return Promise.resolve(allProducts.rows);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async showProduct(product_id: string): Promise<Product> {
    const query = `SELECT * FROM products WHERE id=$1`;
    try {
      const product = await DB.query(query, [product_id]);
      return Promise.resolve(product.rows[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createProduct(product: Product): Promise<void> {
    const newProduct = [];
    Object.entries(product).forEach(([_, value]) => {
      newProduct.push(value);
    });
    const query = `INSERT INTO products (id, name, price) VALUES($1, $2, $3) ;`;
    try {
      await DB.query(query, newProduct);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export const ProductModel = new ProductModelDB();
