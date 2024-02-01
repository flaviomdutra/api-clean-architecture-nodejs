import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value-object/address";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress({
  name: "John Doe",
  address: new Address("Main Street", 123, "12345", "New York"),
});

const input = {
  id: customer.id,
  name: "John Updated Doe",
  address: {
    street: "Main Updated Street",
    number: 1234,
    zip: "12345 Updated",
    city: "New York Updated",
  },
};

const MockRepository = jest.fn(() => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  };
});

describe("Unit Test for customer update use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new UpdateCustomerUseCase(customerRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual(input);
  });
});
