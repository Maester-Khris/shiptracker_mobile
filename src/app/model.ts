export interface User{
    name:string,
    email:string,
    email_verified_at:string,
    telephone:string,
    api_token:string,
    created_at:string,
    updated_at:string
}

export interface Shipping{
    reference_exp:string,
    sender:string,
    receiver:string,
    codebar_digit:string,
    departure_date:string,
    arrival_date:string
}

export interface Preference{
    sms_alert:boolean,
    email_alert:boolean,
    payment_method:string,
    payment_option:string
}