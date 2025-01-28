import { v4 as uuid } from 'uuid';
import Product from "../entity/product";
import IProduct from "../entity/product.interface";
import ProductB from '../entity/product-b';
import { IFactory, IPayload } from '../../@shared/factory/factory.interface';

export default class ProductFactory implements IFactory<IProduct> {
   create(payload: IPayload): IProduct {
      const { type, name, price } = payload;

      switch (type) {
         case 'A':
            return new Product(uuid(), name, price);
         case 'B':
            return new ProductB(uuid(), name, price);
         default:
            throw new Error('Product type not supported');
      }
   }
}
