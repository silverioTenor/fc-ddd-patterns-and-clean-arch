export interface IFactory<K> {
   create(payload: IPayload): K;
}

export interface IPayload {
   [key: string]: any;
}
