import React, { useContext } from 'react';
import { Skeleton } from '@mui/material';
import PatientsListItem from './PatientsList.Item';
import CurrentPatientContext from '../../../lib/contexts/PatientsContext';
import { getPatients } from '../../../lib/api';
import { useQuery } from 'react-query';
import { XCircle } from 'phosphor-react';

const PatientsListItems = () => {
  const { currPatient, setCurrPatient } = useContext(CurrentPatientContext);

  const { isLoading, isError, error, data: patients } = useQuery('patients', getPatients);

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton variant="rectangular" className="!h-20 rounded-md" key={index} />
        ))}
      </>
    );
  }

  if (isError) {
    const errorMsg = (error as IError)?.message;

    return (
      <>
        <XCircle size={32} />
        <div>Erro ao carregar pacientes</div>
        {errorMsg && <span>Error: {errorMsg}</span>}
      </>
    );
  }

  return (
    <>
      {patients?.map((patient: Patient) => {
        const selected = patient.id === currPatient?.id;

        return (
          <PatientsListItem
            key={patient.id}
            patient={patient}
            selected={selected}
            onClick={() => setCurrPatient?.(patient)}
          />
        );
      })}
    </>
  );
};

export default PatientsListItems;
