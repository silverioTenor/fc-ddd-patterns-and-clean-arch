export default class Mapper {
   private constructor() {}

   static convertTo<T extends object, K>(entity: T, listProps?: Array<string>): K {
      let result = {} as K;

      if (listProps) {
         listProps.forEach(props => {
            (result as any)[props] = entity[props as keyof T];
         });

         return result;
      }

      Object.keys(entity).forEach(key => {
         (result as any)[key] = entity[key as keyof T];
      });

      return result;
   }

   static convertListTo<T extends object, K>(entityList: T[], listProps?: Array<string>): K[] {
      let result: K[] = [];

      if (!listProps) {
         entityList.forEach((e: T) => {
            let obj = {} as K;

            Object.keys(e).forEach(key => {
               (obj as any)[key] = e[key as keyof T];
            });

            result.push(obj);
         });

         return result;
      }

      entityList.forEach((entity: T) => {
         let obj = {} as K;

         Object.keys(entity).forEach(key => {
            if (listProps.includes(key)) {
               (obj as any)[key] = entity[key as keyof T];
            }
         });

         result.push(obj);
      });

      return result;
   }
}
