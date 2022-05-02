import React, { useContext } from 'react';
import { Skeleton } from '@mui/material';
import PatientsListItem from './PatientsList.Item';
import PatientsContext from '../../../lib/contexts/PatientsContext';

type Props = ComponentProps<'ul'>;

const PatientsListItems = ({ ...ulProps }: Props) => {
  const { patients, loading, selectedPatient, setSelectedPatient } = useContext(PatientsContext);

  return (
    <>
      <ul
        className="-mx-4 mt-1.5 flex flex-grow flex-col gap-y-2 overflow-y-scroll pt-1 pb-2.5 pl-4 pr-1"
        {...ulProps}
      >
        {!loading
          ? patients?.map((patient) => {
              const selected = patient.id === selectedPatient?.id;

              return (
                <PatientsListItem
                  key={patient.id}
                  patient={patient}
                  selected={selected}
                  onClick={() => setSelectedPatient?.(patient)}
                />
              );
            })
          : Array.from({ length: 6 }).map((_, index) => (
              <Skeleton variant="rectangular" className="!h-20 rounded-md" key={index} />
            ))}
      </ul>
    </>
  );
};

export default PatientsListItems;
