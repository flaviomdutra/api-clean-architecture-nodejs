import { randomUUID } from "node:crypto";
import { Product } from "../entity/product";
import { ProductB } from "../entity/product-b";
import { ProductInterface } from "../entity/product.interface";

export class ProductFactory {
  static create(type: string, name: string, price: number): ProductInterface {
    switch (type) {
      case "a":
        return new Product(randomUUID(), name, price);
      case "b":
        return new ProductB(randomUUID(), name, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}
