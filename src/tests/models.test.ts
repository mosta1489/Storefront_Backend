import "jasmine";
import { UserModel, ProductModel, OrderModel } from "../models";
import { User, Product, Order, OrderWithStatus } from "../contracts/types";

type withoutPassword = Pick<User, "id" | "username" | "firstname" | "lastname">;

describe("User model tests \n", () => {
  //
  it("Create new user ", async () => {
    const user = {
      id: "user_id_1",
      username: "mosta1489",
      firstname: "mostafa",
      lastname: "ahmed",
      password: "aklsgjlkasdjglkjaesli",
    };
    await UserModel.createUser(user).catch((error) => {
      console.log(error);
    });
  });

  it("Return not empty list", async () => {
    const data = await UserModel.getAllUsers();
    expect(data.length).toBeGreaterThan(0);
  });

  it("Return user data", async () => {
    const data = await UserModel.getUserByUserName("mosta1489");
    expect(data).toEqual({
      id: "user_id_1",
      username: "mosta1489",
      firstname: "mostafa",
      lastname: "ahmed",
      password: "aklsgjlkasdjglkjaesli",
      isadmin: false,
    });
  });
});

describe("Product model tests \n", () => {
  it("Create new product", async () => {
    const product: Product = {
      id: "product_id_1",
      name: "product_test",
      price: 555,
    };
    await ProductModel.createProduct(product).catch((err) => {
      console.log(err);
    });
  });

  it("Get all product as a not empty list of products", async () => {
    const products: Product[] = await ProductModel.getAllProducts();
    expect(products.length).toBeGreaterThan(0);
  });

  it("show one product return correct product data", async () => {
    const product: Product = await ProductModel.showProduct("product_id_1");
    expect(product).toEqual({
      id: "product_id_1",
      name: "product_test",
      price: 555,
    });
  });
});

describe("Order model tests \n", () => {
  it("Create new order to user", async () => {
    const order: Order = {
      id: "order_id_1",
      user_id: "user_id_1",
    };
    await OrderModel.createOrder(order).catch((err) => {
      console.log(err);
    });
  });

  it("Add product to order", async () => {
    const order_id = "order_id_1";
    const product_id = "product_id_1";
    const quantity = 50;
    await OrderModel.addToOrder(order_id, product_id, quantity).catch((err) => {
      console.log(err);
    });
  });

  it("Get all oreder as a not empty list of Orders ", async () => {
    const orders: OrderWithStatus[] = await OrderModel.getAllOrders();
    expect(orders.length).toBeGreaterThan(0);
  });

  it("Get user orders return correct orders data", async () => {
    const orders: OrderWithStatus[] = await OrderModel.getUserOrders(
      "user_id_1"
    );
    expect(orders[0]).toEqual({
      id: "order_id_1",
      user_id: "user_id_1",
      status: "active",
    });
  });

  it("Make status of order to be complete ", async () => {
    await OrderModel.updateOrderStatus("order_id_1").catch((err) => {
      console.log(err);
    });
  });

  it("Get user order after updated should be completed", async () => {
    const orders: OrderWithStatus[] = await OrderModel.getUserOrders(
      "user_id_1"
    );
    expect(orders[0]).toEqual({
      id: "order_id_1",
      user_id: "user_id_1",
      status: "complete",
    });
  });

  it(" Delete an order ", async () => {
    await OrderModel.deleteOrder("order_id").catch((error) => {
      console.log(error);
    });
  });
});

it("Finally delete user ", async () => {
  await UserModel.deleteUser("user_id_1").catch((error) => {
    console.log(error);
  });
});
