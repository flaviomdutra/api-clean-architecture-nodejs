import { Address } from "../value-object/address";
import { CustomerFactory } from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create({
      name: "John Doe",
    });

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.Address).toBeUndefined();
  });

  it("should create a customer with address", () => {
    const address = new Address("Main St.", 123, "12345", "New York");

    const customer = CustomerFactory.createWithAddress({
      name: "John Doe",
      address,
    });

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.Address).toBe(address);
  });
});
