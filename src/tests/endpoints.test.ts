import "jasmine";
import supertest from "supertest";
import app from "../server";
const request = supertest(app);

let jwt_user: string, jwt_admin: string, product_id: string, order_id: string;

describe("User API tests", () => {
  it("Create new user (post) /signup", async () => {
    const body_1 = {
      username: "username_api_1",
      firstname: "firstname_api_1",
      lastname: "lastname_api_1",
      password: "password_1",
    };
    const body_2 = {
      username: "username_api_2",
      firstname: "firstname_api_2",
      lastname: "lastname_api_2",
      password: "password_2",
    };
    await request.post("/user/signup").send(body_1).expect(200);
    await request.post("/user/signup").send(body_2).expect(200);
  });

  it("Signin to take a token ", async () => {
    const body_1 = {
      username: "username_api_1",
      password: "password_1",
    };
    const body_2 = {
      username: "username_api_1",
      password: "password_1",
    };
    const response_1 = await request
      .post("/user/signin")
      .send(body_1)
      .expect(200);
    jwt_admin = response_1.body.jwt;
    const response_2 = await request
      .post("/user/signin")
      .send(body_2)
      .expect(200);
    jwt_user = response_2.body.jwt;
  });

  it("Make user as admin to take new token", async () => {
    const body = { secret: "SECRET_PASSWORD" };
    const response = await request
      .post("/user/admin")
      .send(body)
      .set("authorization", jwt_admin)
      .expect(200);
    jwt_admin = response.body.jwt;
  });

  it("Show all user using admin token", async () => {
    const response = await request
      .get("/user/all")
      .set("authorization", jwt_admin)
      .expect(200);
  });
});

describe("Product API tests", () => {
  it("Create Product using admin token", async () => {
    const body = {
      name: "product_1",
      price: 500,
    };
    await request
      .post("/product/")
      .send(body)
      .set("authorization", jwt_admin)
      .expect(200);
  });

  it("Show all products without token", async () => {
    const response = await request.get("/product/").expect(200);
    product_id = response.body.products[0].id;
  });

  it("Show specific product using product id", async () => {
    await request.get(`/product/${product_id}`).expect(200);
  });
});

describe("Orders API tests", () => {
  it("Create new order using user token", async () => {
    await request.post("/order/").set("authorization", jwt_user).expect(200);
  });

  it("Get user orders using user token", async () => {
    const response = await request
      .get("/order/")
      .set("authorization", jwt_user)
      .expect(200);
    order_id = response.body.orders[0].id;
  });

  it("Add product to order", async () => {
    const body = {
      orderId: order_id,
      productId: product_id,
      quantity: 5,
    };
    await request
      .post("/order/addtoorder/")
      .send(body)
      .set("authorization", jwt_user)
      .expect(200);
  });

  it("Get all orders using admin token", async () => {
    await request.get("/order/all").set("authorization", jwt_admin).expect(200);
  });

  it("edite order status to complet using admin token", async () => {
    await request
      .put(`/order/${order_id}`)
      .set("authorization", jwt_admin)
      .expect(200);
  });
});
