import Notification from "../notification/notification";

export default abstract class Entity {
   // protected id: string;
   protected notification: Notification;

   constructor(id?: string) {
      // this.id = !!id ? id : uuid();
      this.notification = new Notification();
   }
}
