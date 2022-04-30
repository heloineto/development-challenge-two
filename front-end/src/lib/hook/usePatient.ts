import { useState } from 'react';

const usePatient = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

  return { patient, setPatient };
};

export default usePatient;
