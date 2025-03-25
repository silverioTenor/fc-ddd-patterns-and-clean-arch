import Customer from './customer';
import { ICustomerPj } from './customer.interface';
import NotificationError from '@domain/@shared/notification/notification.error';

export default class CustomerPj extends Customer implements ICustomerPj {
   private tradeName: string;
   private cnpj: number;

   constructor(companyName: string, tradeName: string, cnpj: number, id?: string) {
      super(companyName, id);
      this.tradeName = tradeName;
      this.cnpj = cnpj;
      this.validade();

      if (this.notification.hasErrors()) {
         throw new NotificationError(this.notification.getErrors());
      }
   }

   getTradeName(): string {
      return this.tradeName;
   }

   getCnpj(): number {
      return this.cnpj;
   }

   validade(): void {
      if (!(!!this.tradeName)) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Trade name is required!',
         });
      } else if (this.cnpj.toString().length !== 14) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Invalid cnpj!',
         });
      }
   }

   changeTradeName(tradeName: string): void {
      if (!(!!tradeName)) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Trade name is required!',
         });
      }
      this.tradeName = tradeName;
   }

   toString(): string {
      return `${this.getName()} whose cnpj is ${this.cnpj}`;
   }
}
