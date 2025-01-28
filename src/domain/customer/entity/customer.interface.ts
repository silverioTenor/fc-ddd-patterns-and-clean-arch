import Address from '../value-object/address';

export interface ICustomer {
   get id(): string;
   get name(): string;
   get address(): Address;
   get rewardPoints(): number;
   validate(): void;
   isActive(): boolean;
   changeAddress(address: Address): void;
   activate(): void;
   deactivate(): void;
   addPoints(points: number): void;
   toString(): string;
}

export interface ICustomerPj {
   get tradeName(): string;
   get cnpj(): number;
   changeTradeName(tradeName: string): void;
}
