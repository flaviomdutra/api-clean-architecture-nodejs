import { CreateCustomerUseCase } from "./create.customer.usecase";

const input = {
  name: "Jonh Doe",
  address: {
    street: "Street 1",
    city: "city",
    number: 1,
    zip: "12345-123",
  },
};

const MockRepository = jest.fn(() => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
});

describe("Unit test create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: "Jonh Doe",
      address: {
        street: "Street 1",
        city: "city",
        number: 1,
        zip: "12345-123",
      },
    });
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    await expect(useCase.execute({ ...input, name: "" })).rejects.toThrow(
      "Name is required"
    );
  })

  it("should throw an error when street is missing", async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    await expect(useCase.execute({ ...input, address: { ...input.address, street: "" } })).rejects.toThrow(
      "Street is required"
    );
  })
});
