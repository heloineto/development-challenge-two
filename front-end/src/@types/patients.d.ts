interface Patient {
  fullName: string;
  birthdate?: Date;
  email?: string;
  address?: Address;
  id?: number;
}

interface Address {
  zipCode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  streetNumber: string;
  complement?: string;
}
