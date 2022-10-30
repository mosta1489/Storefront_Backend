import { expressHandler, Product } from "../contracts/types";
import { ProductModel } from "../models";

import {
  GetAllProductsResponse,
  ShowProductParams,
  ShowProductResponse,
  CreteProductRequest,
  CreteProductResponse,
} from "../contracts/api";
import crypto from "crypto";

export const getProductsHandler: expressHandler<
  never,
  never,
  GetAllProductsResponse
> = async (req, res) => {
  const products = await ProductModel.getAllProducts();
  return res.status(200).send({ products });
};

export const showProductHandler: expressHandler<
  ShowProductParams,
  never,
  ShowProductResponse
> = async (req, res) => {
  const product_id = req.params.id;
  const product = await ProductModel.showProduct(product_id);
  if (!product) {
    return res.status(404).send({ error: "Not Found" });
  }
  return res.status(200).send({ product });
};

export const createProductHandler: expressHandler<
  never,
  CreteProductRequest,
  CreteProductResponse
> = async (req, res) => {
  let { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).send({ error: "all field are reqired" });
  }

  const id = crypto.randomUUID();
  const product: Product = { id, name, price };
  await ProductModel.createProduct(product);
  return res.status(200).send({ message: "Product created successfuly" });
};
