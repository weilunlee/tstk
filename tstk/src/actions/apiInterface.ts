export interface GetOrederList{
    id:number,
    month:number
}

export interface OrderInterface{
    id:number,
    name:string,
    customer_id: string,
    place_time:string,
    payment_status:number,
    payment_time:string,
    product_status:number,
    shipping_status:number,
    shipping_time:string,
    arrive_time:string,
    optional:string,
    created_at:string,
    updated_at:string
}

export interface PostOrder{
    name:string,
    customer_id: string,
    optional: string
}