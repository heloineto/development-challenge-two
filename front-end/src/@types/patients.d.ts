interface Patient {
  fullName: string;
  birthdate?: Date;
  email?: string;
  adress?: Adress;
}

interface Adress {
  zipCode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  streetNumber: string;
  complement?: string;
}
