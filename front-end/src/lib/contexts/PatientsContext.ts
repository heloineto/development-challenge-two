import { createContext } from 'react';

const CurrentPatientContext = createContext<
  Partial<{
    currPatient: Patient | null;
    setCurrPatient: SetState<Patient | null>;
  }>
>({});

export default CurrentPatientContext;
