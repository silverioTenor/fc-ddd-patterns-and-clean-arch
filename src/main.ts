import { v4 as uuid } from 'uuid';
import Customer from "@domain/customer/entity/customer";
import Address from '@domain/customer/value-object/address';
import OrderItem from '@domain/checkout/entity/order-item';
import Order from '@domain/checkout/entity/order';

// let customer = new Customer(uuid(), 'John');
// const address = new Address('Street', 123, 'City', 'State', 'Country', 12345678);
// customer.changeAddress(address);
// customer.activate();

// const item1 = new OrderItem(uuid(), uuid(), 'Item 1', 1, 100);
// const item2 = new OrderItem(uuid(), uuid(), 'Item 2', 2, 200);
// const order = new Order(uuid(), customer.id, [item1, item2]);
