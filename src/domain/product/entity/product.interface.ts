export default interface IProduct {
   get id(): string;
   get name(): string;
   get price(): number;
   changePrice(price: number): void;
}
