import * as React from 'react';
import PatientList from './components/patients/PatientList';
import Container from './components/layout/Container';
import Grid from './components/layout/Grid';
import Logo from './components/logo/Logo';
import PatientViewer from './components/patients/PatientViewer';

export default function App() {
  return (
    <Container className="flex h-screen flex-col py-5">
      <div className="mt-1 mb-7 grid h-10 place-items-center">
        <Logo className="" />
      </div>
      <Grid className="flex-grow">
        <PatientList className="col-span-3" />
        <PatientViewer className="col-span-9" />
      </Grid>
    </Container>
  );
}
