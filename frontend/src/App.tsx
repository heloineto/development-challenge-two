import React, { useState } from 'react';
import Container from './components/layout/Container';
import Grid from './components/layout/Grid';
import Logo from './components/logo/Logo';
import PatientsList from './components/patients/PatientsList';
import PatientProfile from './components/patients/PatientProfile';
import CurrentPatientContext from './lib/contexts/PatientsContext';

const App = () => {
  const [currPatient, setCurrPatient] = useState<Patient | null>(null);

  return (
    <Container className="flex flex-col py-5 xl:h-screen">
      <div className="mb-5 grid place-items-center">
        <Logo />
      </div>
      <Grid className="flex-grow  overflow-hidden">
        <CurrentPatientContext.Provider value={{ currPatient, setCurrPatient }}>
          <PatientsList className="col-span-12 lg:col-span-4" />
          <PatientProfile className="col-span-12 lg:col-span-8" />
        </CurrentPatientContext.Provider>
      </Grid>
    </Container>
  );
};

export default App;
