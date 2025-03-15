import AppError from "./app.error";

export default class HttpNotFound extends AppError {
   public readonly message: string;

   constructor(message: string) {
      super(message, 404);
      this.message = message;
   }
}
