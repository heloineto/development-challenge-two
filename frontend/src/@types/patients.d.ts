interface Patient {
  id: string;
  fullName: string;
  birthdate?: string;
  email?: string;
  address?: Address;
  picture?: string;
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
