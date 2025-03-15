import AppError from "./app.error";

export default class HttpValidation extends AppError {
   public readonly message: string;

   constructor(message: string) {
      super(message, 422);
      this.message = message;
   }
}
