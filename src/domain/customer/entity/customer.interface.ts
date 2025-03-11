import Address from '../value-object/address';

export interface ICustomer {
   getId(): string;
   getName(): string;
   getAddress(): Address;
   getRewardPoints(): number;
   validate(): void;
   isActive(): boolean;
   changeAddress(address: Address): void;
   activate(): void;
   deactivate(): void;
   addPoints(points: number): void;
   toString(): string;
}

export interface ICustomerPj {
   getTradeName(): string;
   getCnpj(): number;
   changeTradeName(tradeName: string): void;
}
