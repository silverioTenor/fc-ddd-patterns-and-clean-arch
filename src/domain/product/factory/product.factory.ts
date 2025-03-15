import Product from "../entity/product";
import IProduct from "../entity/product.interface";
import ProductB from '../entity/product-b';
import { IFactory, IPayload } from '../../@shared/factory/factory.interface';
import HttpBadRequest from "@infra/api/errors/http.bad.request.error";

export default class ProductFactory implements IFactory<IProduct> {
   create(payload: IPayload): Product {
      const { id, type, name, price } = payload;

      switch (type) {
         case 'A':
            return new Product(name, price, id);
         case 'B':
            return new ProductB(name, price, id);
         default:
            throw new HttpBadRequest('Product type not supported');
      }
   }
}
