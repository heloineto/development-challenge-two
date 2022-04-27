import * as React from 'react';
import PatientList from './components/patients/PatientList';
import Container from './components/layout/Container';
import Grid from './components/layout/Grid';

export default function App() {
  return (
    <Container className="h-screen py-10">
      <Grid className="h-full">
        <PatientList className="col-span-3" />
      </Grid>
    </Container>
  );
}
