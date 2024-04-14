import {CartItem, ShippingInfo, User} from "./types.ts";

export interface userReducerInitialState{
    user:User | null,
    isLoading:boolean
}
export interface CartReducerInitialState{
    isLoading:boolean,
    cartItems:CartItem[]
    total:number,
    subtotal:number,
    tax:number,
    discount:number,
    shippingCharges:number,
    shippingInfo:ShippingInfo,
    isRefetch:boolean
}