export type FullName = {
  firstName: string;
  lastName: string;
};

export type addressObj = {
  street: string;
  city: string;
  country: string;
};

export type ordersArray = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: [string, string];
  address: addressObj;
  orders: [ordersArray];
};
