import { v4 as uuid } from 'uuid';
import Customer from "./entity/customer";
import Address from './entity/address';
import OrderItem from './entity/order_item';
import Order from './entity/order';

let customer = new Customer(uuid(), 'John');
const address = new Address('Street', 123, 'City', 'State', 'Country', '12345678');
customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem(uuid(), 'Item 1', 1, 100);
const item2 = new OrderItem(uuid(), 'Item 2', 2, 200);
const order = new Order(uuid(), customer.id, [item1, item2]);
