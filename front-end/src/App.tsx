import * as React from 'react';
import Container from './components/layout/Container';
import Grid from './components/layout/Grid';
import Logo from './components/logo/Logo';
import PatientsList from './components/patients/PatientsList';
import PatientProfile from './components/patients/PatientProfile';

const App = () => {
  return (
    <Container className="flex flex-col py-5 xl:h-screen">
      <div className="mb-5 grid place-items-center">
        <Logo />
      </div>
      <Grid className="flex-grow">
        <PatientsList className="col-span-12 xl:col-span-4" />
        <PatientProfile className="col-span-12 xl:col-span-8" />
      </Grid>
    </Container>
  );
};

export default App;
