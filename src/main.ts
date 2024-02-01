import { Order } from "./domain/checkout/entity/order";
import { OrderItem } from "./domain/checkout/entity/order-item";
import { Customer } from "./domain/customer/entity/customer";
import { Address } from "./domain/customer/value-object/address";


const customer = new Customer("customer-1", "John Doe");
const address = new Address("Main St", 123, "Anytown", "USA");

customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, 'product-1', 1);
const item2 = new OrderItem("2", "Item 2", 15, 'product-2', 2);

const order = new Order("1", "customer-1", [item1, item2]);