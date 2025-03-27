export default class Mapper {
   private constructor() {}

   static convertTo<T extends object, K>(entity: T, blackList?: Array<string>): K {
      let result = {} as K;

      Object.keys(entity).forEach(key => {
         if (!blackList?.includes(key)) {
            if (Array.isArray(entity[key as keyof T])) {
               const arrayProps = (entity as any)[key] as any[];
               const arrayTemp = [] as any[];

               arrayProps.forEach(props => {
                  const element = {} as any;

                  Object.keys(props).forEach((subKey, i, list) => {
                     if (!blackList?.includes(subKey)) {
                        element[subKey] = props[subKey];
                     }

                     if (list.length - 1 === i) {
                        arrayTemp.push(element);
                     }
                  });
               });

               (entity as any)[key] = arrayTemp;

            } else if (typeof entity[key as keyof T] === 'object') {
               const property = (entity as any)[key];
               let element = {} as any;

               Object.keys(property).forEach((subKey, i, list) => {
                  if (!blackList?.includes(subKey)) {
                     element[subKey] = property[subKey];
                  }

                  if (list.length - 1 === i) {
                     entity[key as keyof T] = element;
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

      entityList.forEach((entity: T) => {
         let obj = {} as any;

         Object.keys(entity).forEach(key => {
            if (!blackList?.includes(key)) {
               if (Array.isArray(entity[key as keyof T])) {
                  const arrayProps = (entity as any)[key] as any[];
                  const arrayTemp = [] as any[];

                  arrayProps.forEach(props => {
                     const element = {} as any;

                     Object.keys(props).forEach((subKey, i, list) => {
                        if (!blackList?.includes(subKey)) {
                           element[subKey] = props[subKey];
                        }

                        if (list.length - 1 === i) {
                           arrayTemp.push(element);
                        }
                     });
                  });

                  (entity as any)[key] = arrayTemp;

               } else if (typeof entity[key as keyof T] === 'object') {
                  const element = (entity as any)[key];
                  let tmp = {} as any;

                  Object.keys(element).forEach((subKey, i, list) => {
                     if (!blackList?.includes(subKey)) {
                        tmp[subKey] = element[subKey];
                     }

                     if (list.length - 1 === i) {
                        (entity as any)[key] = tmp;
                     }
                  });
               }

               obj[key] = entity[key as keyof T];
            }
         });

         result.push(obj);
      });

      return result;
   }
}
