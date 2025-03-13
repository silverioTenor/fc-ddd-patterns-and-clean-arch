export interface IFactory<K> {
   create(payload: any): K;
}

export interface IPayload {
   [key: string]: any;
}
