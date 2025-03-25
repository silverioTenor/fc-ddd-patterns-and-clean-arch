export default class Mapper {
   private constructor() {}

   static convertTo<T extends object, K>(entity: T, blackList?: Array<string>): K {
      let result = {} as K;

      Object.keys(entity).forEach(key => {
         if (!blackList?.includes(key)) {
            if (typeof entity[key as keyof T] === 'object') {
               const element = (entity as any)[key];
               let tmp = {} as any;

               Object.keys(element).forEach((subKey, i, list) => {
                  if (!blackList?.includes(subKey)) {
                     tmp[subKey] = element[subKey];
                  }

                  if (list.length - 1 === i) {
                     entity[key as keyof T] = tmp;
                  }
               });
            }

            (result as any)[key] = entity[key as keyof T];
         }
      });

      return result;
   }

   static convertListTo<T extends object, K>(entityList: T[], blackList?: Array<string>): K[] {
      let result: K[] = [];

      entityList.forEach((e: T) => {
         let obj = {} as any;

         Object.keys(e).forEach(key => {
            if (!blackList?.includes(key)) {
               if (typeof e[key as keyof T] === 'object') {
                  const element = (e as any)[key];
                  let tmp = {} as any;

                  Object.keys(element).forEach((subKey, i, list) => {
                     if (!blackList?.includes(subKey)) {
                        tmp[subKey] = element[subKey];
                     }

                     if (list.length - 1 === i) {
                        (e as any)[key] = tmp;
                     }
                  });
               }

               obj[key] = e[key as keyof T];
            }
         });

         result.push(obj);
      });

      return result;
   }
}
