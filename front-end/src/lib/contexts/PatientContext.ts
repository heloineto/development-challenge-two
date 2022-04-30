import { createContext } from 'react';
import usePatient from '../hook/usePatient';

const PatientContext = createContext<Partial<ReturnType<typeof usePatient>>>({});

export default PatientContext;
