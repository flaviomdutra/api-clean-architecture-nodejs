import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import { CustomerModel } from "../../../infrastructure/customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { FindCustomerUseCase } from "./find.customer.usecase";

describe("Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer("123", "Jonh Doe");
    const address = new Address("Street 1", 1, "12345-123", "city");
    customer.changeAddress(address);

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
});
