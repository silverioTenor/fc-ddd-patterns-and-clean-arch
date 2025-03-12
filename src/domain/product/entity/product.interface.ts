export default interface IProduct {
   getId(): string;
   getName(): string;
   getPrice(): number;
   changePrice(price: number): void;
}
