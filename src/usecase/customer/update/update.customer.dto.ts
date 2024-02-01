export interface InputUpdateCustomer {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}

export interface OutputUpdateCustomer {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}
