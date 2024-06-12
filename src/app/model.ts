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

export enum ShippingStatus {
    ORDERED = 'Expedition crée',
    DEPOSITED = 'Paquet(s) arrivé(s) à l\'entrepot',
    ONWAY = 'Expédition en cours',
    ARRIVED = 'Paquet(s) arrivé(s) à destination',
    DELIVERED = 'Fin de l\'expédition',
}

export function statusEquivalenceV0(status){
  switch (status) {
    case 'ORDERED':
      return ShippingStatus.ORDERED;
    case 'ONWAY':
      return ShippingStatus.ONWAY;
    case 'DEPOSITED':
      return ShippingStatus.DEPOSITED;
    case 'ARRIVED':
      return ShippingStatus.ARRIVED;
    case 'DELIVERED':
      return ShippingStatus.DELIVERED;
    default:
      return ShippingStatus.ONWAY
  }
}

export function statusEquivalenceV1(status) {
  switch (status) {
    case ShippingStatus.ONWAY:
      return 'ONWAY' ;
    case ShippingStatus.ORDERED:
      return 'ORDERED' ;
    case ShippingStatus.DEPOSITED:
      return 'DEPOSITED';
    case ShippingStatus.ARRIVED:
      return 'ARRIVED' ;
    case ShippingStatus.DELIVERED:
      return 'DELIVERED';
    default:
      return 'ONWAY'
  }
}