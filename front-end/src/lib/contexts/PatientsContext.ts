import { createContext } from 'react';
import usePatients from '../hook/usePatients';

const PatientsContext = createContext<Partial<ReturnType<typeof usePatients>>>({});

export default PatientsContext;
