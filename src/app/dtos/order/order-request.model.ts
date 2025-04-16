interface OrderRequest {
  customerName: string;
  customerContact: string;
  addressDetails: AddressDetails;
  totalAmount: number;
  couponCode?: string;
  orderItems: OrderItemDTO[];
  paymentMethod: PaymentMethod;
}
