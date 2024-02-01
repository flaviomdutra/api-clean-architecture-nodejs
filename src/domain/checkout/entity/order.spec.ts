import { Order } from "./order";
import { OrderItem } from "./order-item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Order("", "customer-id", [])).toThrow("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => new Order("123", "", [])).toThrow("CustomerId is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => new Order("123", "customer-id", [])).toThrow(
      "Items are required"
    );
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("item-1", "Item 1", 100, "product-1", 2);
    const item2 = new OrderItem("item-2", "Item 2", 200, "product-2", 2);

    const order = new Order("order-1", "customer-1", [item1]);
    expect(order.total()).toBe(200);

    const order2 = new Order("order-2", "customer-1", [item1, item2]);
    expect(order2.total()).toBe(600);
  });

  it("should check throw error if the item quantity is less or equal zero", () => {
 
    expect(() =>{
      const item = new OrderItem("item-1", "Item 1", 100, "product-1", 0);
      const order = new Order("order-1", "customer-1", [item]);
    })
    .toThrow("Quantity must be greater than zero");
  });
});
