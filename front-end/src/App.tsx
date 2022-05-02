import React from 'react';
import Container from './components/layout/Container';
import Grid from './components/layout/Grid';
import Logo from './components/logo/Logo';
import PatientsList from './components/patients/PatientsList';
import PatientProfile from './components/patients/PatientProfile';
import PatientsContext from './lib/contexts/PatientsContext';
import usePatients from './lib/hook/usePatients';

const App = () => {
  const patientsCtx = usePatients();

  return (
    <Container className="flex flex-col py-5 xl:h-screen">
      <div className="mb-5 grid place-items-center">
        <Logo />
      </div>
      <Grid className="flex-grow">
        <PatientsContext.Provider value={patientsCtx}>
          <PatientsList className="col-span-12 xl:col-span-4" />
          <PatientProfile className="col-span-12 xl:col-span-8" />
        </PatientsContext.Provider>
      </Grid>
    </Container>
  );
};

export default App;
