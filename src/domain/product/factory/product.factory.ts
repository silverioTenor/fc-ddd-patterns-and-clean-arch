import { v4 as uuid } from 'uuid';
import Product from "../entity/product";
import IProduct from "../entity/product.interface";
import ProductB from '../entity/product-b';

export default class ProductFactory {
   public static create(type: string, name: string, price: number): IProduct {
      switch (type) {
         case 'a':
            return new Product(uuid(), name, price);
         case 'b':
            return new ProductB(uuid(), name, price);
         default:
            throw new Error('Product type not supported');
      }
   }
}
