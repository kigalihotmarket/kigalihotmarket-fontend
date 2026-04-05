export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: IRoles[];
  password: string;
  createdAt: Date;
  phoneNumber: string;
  updatedAt: Date;
  otp: string | null;
  otpExpiresAt: Date | null;
  photo: string;
  role: string;
}

export interface IUserRequest
  extends Omit<
  IUser,
    "id" 
  > {
  id?: string;
}
export interface IPermission {
  id: string;
  label: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IRoles {
  id: string;
  userId: string;
  role: string;
}

export type UserPermission = Pick<IPermission, "id" | "label">;

export interface IUserWithPermissions extends IUser {
  permissions: UserPermission[];
  roles: IRole[];
}

export interface AuthState extends Pick<IUser, "name" | "email" | "phone"> {
  token: string;
  roles: string[];
}

export interface IRoute {
  path: string;
  element: ComponentType<unknown>;
  allowedPermissionGroup?: PermissionGroup;
  allowedPermissions?: Permission[];
  superAdmin?: boolean;
}

export interface IPermissionsGroup {
  group: string;
  permissions: string[];
}

export type IUUID = string;

export interface IPaged<T> {
  data: T;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface IUsersResponse {
  data: IUser[];
  totalItems: number;
}

export enum ProductCategory {
  WOMENS_FASHION,
  MENS_FASHION,
  FASHION,
  ELECTRONICS,
  FURNITURES,
  MADE_IN_RWANDA,
  HOME_AND_LIVING,
  SUPERMARKETING,
  MOBILES_AND_TABLETS,
  COMPUTERS_AND_GAMING,
  HEALTH_AND_BEAUTY,
  SPORTS_EQUIPMENT,
  ART_AND_ENTERTAINMENT,
  RESTAURANTS,
  JEWELRY_AND_WATCHES,
  KIDS_AND_BABIES,
  AUTO_SPARE_PARTS,
  VEHICLES_SHOPPING,
}

export interface IProduct {
  id: string;
  name: string;
  isFeatured: boolean;
  description: string;
  price: number;
  teaser: string;
  model: string;
  warranty: string;
  featuresOne?: string;
  featuresTwo?: string;
  featuresThree?: string;
  featuresFour?: string;
  featuresFive?: string;
  featuresFix?: string;
  featuresSeven?: string;
  featuresEight?: string;
  featuresNine?: string;
  featuresTen?: string;
  discountPercentage: number;
  category: ProductCategory | string;
  brand: string;
  stockQuantity: number;
  isActive: boolean;
  thumbnail: string;
  galleryImages: string[];
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductRequest
  extends Omit<
  IProduct,
    "id" | "galleryImages"
  > {
  id?: string;
  galleryImages: string[];
}

export interface IOrder {
  id: string;
  orderNumber: number;
  status: string;
  totalAmount: number;
  subTotal: number;
  discount: number | null;
  deliveryFee: number | null;
  createdAt: string;
  updatedAt: string;
  orderItems: IOrderItem[];
  payment: IPayment;
  delivery: IDelivery;
}

export interface IOrderItems {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: string;
  createdAt: Date;
  updatedAt: Date;
  product: IProduct;
}



export interface IOrderItemReq {
  productId: string;
  quantity: number;
}
export interface IOrderRequest {
  orderItems: IOrderItemReq[];
}


export interface IPayment {
  id: string;
  orderId: string;
  amount: number;
  method: string;
  status: string;
  paidAt: string;
  accountNumber: string;
  accountProvider: string;
  refId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDelivery {
  id: string;
  orderId: string;
  address: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  customerNote: string;
  deliveryStatus: string;
  estimatedDate: string;
  deliveredAt: string | null;
  createdAt: string;
  updatedAt: string;
  order: IOrder;
}

export interface IDeliveryRequest
  extends Omit<
  IDelivery,
    "id" 
  > {
  id?: string;
}

enum PaymentMethod {
  CARD,
  CASH_ON_DELIVERY,
  MOBILE_MONEY,
  AIRTEL_MONEY,
  BANK_TRANSFER,
  MTN_MOBILE_MONEY
}

export interface CardFormData {
  orderId: string;
  cardName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
  method: "CARD";
}

export interface MobileFormData {
  orderId: string;
  accountNumber: string;
  amount: number;
  method: "MTN_MOBILE_MONEY" | "AIRTEL_MONEY" | "";
}

export interface DeliveryFormData {
  orderId: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  customerPhone: string;
}