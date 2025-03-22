import { NotificationErrorProps } from './notification';

export default class NotificationError extends Error {
   constructor(protected errors: NotificationErrorProps[]) {
      super(errors.map(err => `${err.context}: ${err.message}`).join(',\n'));
      // super(JSON.stringify(errors));
   }
}
