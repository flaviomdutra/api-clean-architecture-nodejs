import { randomUUID } from "node:crypto";
import { Customer } from "../entity/customer";
import { Address } from "../value-object/address";

export class CustomerFactory {
  static create({ name }: Partial<Customer>): Customer {
    return new Customer(randomUUID(), name);
  }

  static createWithAddress({
    name,
    address,
  }: Partial<Customer> & { address: Address }): Customer {
    const customer = new Customer(randomUUID(), name);
    customer.changeAddress(address);

    return customer;
  }
}
