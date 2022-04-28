interface Patient {
  fullName: string;
  birthdate?: Date;
  email?: string;
  phoneNumber?: string;
  adress?: Adress;
  profilePicture?: Picture;
  sex?: 'M' | 'F' | 'O';
  smoker?: 'Y' | 'N' | 'E';
  nationality?: string;
  maritalStatus?: 'D' | 'M' | 'X' | 'S' | 'W' | 'N' | 'L';
  profession?: string;
  motherFullName?: string;
  fatherFullName?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  notes?: string;
  draftMedicalRecord?: MedicalRecord;
}
