import { v4 as uuid } from 'uuid';
import Customer from './customer';
import { ICustomerPJ } from './customer.interface';

export default class CustomerPj extends Customer implements ICustomerPJ {
   private _tradeName: string;
   private _cnpj: number;

   constructor(companyName: string, tradeName: string, cnpj: number) {
      super(uuid(), companyName);
      this._tradeName = tradeName;
      this._cnpj = cnpj;
   }

   get tradeName(): string {
      return this._tradeName;
   }

   get cnpj(): number {
      return this._cnpj;
   }

   validade(): void {
      throw new Error('Method not implemented.');
   }

   changeTradeName(tradeName: string): void {
      throw new Error('Method not implemented.');
   }
}
