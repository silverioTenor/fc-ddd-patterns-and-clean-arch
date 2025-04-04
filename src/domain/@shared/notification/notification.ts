export type NotificationErrorProps = {
   message: string;
   context: string;
};

export default class Notification {
   private errors: NotificationErrorProps[] = [];

   addError(error: NotificationErrorProps) {
      this.errors.push(error);
   }

   hasErrors() {
      return this.errors.length > 0;
   }

   getErrors() {
      return this.errors;
   }

   messages(context?: string) {
      let message = '';

      this.errors.forEach(error => {
         if (context === undefined || error.context === context) {
            message += `${error.context}: ${error.message}, `;
         }
      });

      message = message.substring(0, message.length - 2);
      return message;
   }
}
