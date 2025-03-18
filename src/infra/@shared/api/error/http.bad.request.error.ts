import AppError from "./app.error";

export default class HttpBadRequest extends AppError {
   public readonly message: string;

   constructor(message: string) {
      super(message, 400);
      this.message = message;
   }
}
