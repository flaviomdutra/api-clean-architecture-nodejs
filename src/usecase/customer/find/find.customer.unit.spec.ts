import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import { FindCustomerUseCase } from "./find.customer.usecase";

const customer = new Customer("123", "Jonh Doe");
const address = new Address("Street 1", 1, "12345-123", "city");
customer.changeAddress(address);

const MockRepository = jest.fn(() => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  };
});

describe("Test find customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    await customerRepository.create(customer);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Jonh Doe",
      address: {
        street: "Street 1",
        city: "city",
        number: 1,
        zip: "12345-123",
      },
    };

    const result = await useCase.execute(input);

    expect(output).toEqual(result);
  });

  it("should not find a customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const useCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123",
    };

    await expect(useCase.execute(input)).rejects.toThrow("Customer not found");
  });
});
