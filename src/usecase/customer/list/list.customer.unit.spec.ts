import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value-object/address";
import { ListCustomerUseCase } from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress({
  name: "John Doe",
  address: new Address("Main Street", 123, "12345", "New York"),
});

const customer2 = CustomerFactory.createWithAddress({
  name: "Jane Doe",
  address: new Address("Main Street", 123, "12345", "New York"),
});

const MockRepository = jest.fn(() => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
  };
});

describe("Unit Test for customer list use case", () => {
  it("should list all customers", async () => {
    const customerRepository = MockRepository();
    const useCase = new ListCustomerUseCase(customerRepository);

    const output = await useCase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].name).toBe("John Doe");
    expect(output.customers[1].name).toBe("Jane Doe");

    expect(output.customers[0].address.street).toBe("Main Street");
    expect(output.customers[1].address.street).toBe("Main Street");

    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[1].id).toBe(customer2.id);
  });
});
