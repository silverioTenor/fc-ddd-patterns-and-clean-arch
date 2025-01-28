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
      this.validade();
   }

   get tradeName(): string {
      return this._tradeName;
   }

   get cnpj(): number {
      return this._cnpj;
   }

   validade(): void {
      if (this._tradeName.length === 0) {
         throw new Error('Trade name is required!');
      } else if (this._cnpj.toString().length !== 14) {
         throw new Error('Invalid cnpj!');
      }
   }

   changeTradeName(tradeName: string): void {
      if (tradeName.length === 0) {
         throw new Error('Trade name is required!');
      }
      this._tradeName = tradeName;
   }

   toString(): string {
      return `${this.name} whose cnpj is ${this._cnpj}`;
   }
}
