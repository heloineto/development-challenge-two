import * as React from 'react';
import Container from './components/layout/Container';
import Grid from './components/layout/Grid';
import Logo from './components/logo/Logo';
import PatientList from './components/patients/PatientList';
import PatientViewer from './components/patients/PatientViewer';

const App = () => {
  return (
    <Container className="flex h-screen flex-col py-5">
      <div className="mb-5 grid place-items-center">
        <Logo />
      </div>
      <Grid className="flex-grow">
        <PatientList className="col-span-3" />
        <PatientViewer className="col-span-9" />
      </Grid>
    </Container>
  );
};

export default App;
