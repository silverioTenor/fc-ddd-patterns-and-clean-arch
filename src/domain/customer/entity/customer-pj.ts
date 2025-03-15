import HttpNotFound from '@infra/api/errors/http.not.found.error';
import Customer from './customer';
import { ICustomerPj } from './customer.interface';

export default class CustomerPj extends Customer implements ICustomerPj {
   private tradeName: string;
   private cnpj: number;

   constructor(companyName: string, tradeName: string, cnpj: number) {
      super(companyName);
      this.tradeName = tradeName;
      this.cnpj = cnpj;
      this.validade();
   }

   getTradeName(): string {
      return this.tradeName;
   }

   getCnpj(): number {
      return this.cnpj;
   }

   validade(): void {
      if (this.tradeName.length === 0) {
         throw new HttpNotFound('Trade name is required!');
      } else if (this.cnpj.toString().length !== 14) {
         throw new HttpNotFound('Invalid cnpj!');
      }
   }

   changeTradeName(tradeName: string): void {
      if (tradeName.length === 0) {
         throw new HttpNotFound('Trade name is required!');
      }
      this.tradeName = tradeName;
   }

   toString(): string {
      return `${this.getName()} whose cnpj is ${this.cnpj}`;
   }
}
