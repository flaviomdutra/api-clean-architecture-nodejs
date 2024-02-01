import { Address } from "../value-object/address";
import { Customer } from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "John");
    }).toThrow("Customer: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrow("Customer: Name is required");
  });

  it("should throw error when name and id are empty", () => {
    expect(() => {
      new Customer("", "");
    }).toThrow("Customer: Id is required,Customer: Name is required");
  });


  it("should change name", () => {
    // Arrange
    const customer = new Customer("123", "John");

    // Act
    customer.changeName("Jane");

    // Assert
    expect(customer.name).toBe("Jane");
  });

  it("should activate customer", () => {
    // Arrange
    const customer = new Customer("123", "John");
    const address = new Address("Main St", 123, "12345", "New York");
    customer.Address = address;

    // Act
    customer.activate();

    // Assert
    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    // Arrange
    const customer = new Customer("123", "John");

    // Act
    customer.deactivate();

    // Assert
    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("123", "John");
      customer.activate();
    }).toThrow("Address is mandatory to activate a customer");
  });

  it('should add reward points', () => {
    const customer = new Customer("123", "John");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  })
});
