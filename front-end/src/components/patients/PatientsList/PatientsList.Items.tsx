import React, { useContext } from 'react';
import { Pagination, PaginationItem, Skeleton } from '@mui/material';
import { CaretLeft, CaretRight } from 'phosphor-react';
import PatientsListItem from './PatientsList.Item';
import PatientsContext from '../../../lib/contexts/PatientsContext';

type Props = ComponentProps<'ul'>;

const PatientsListItems = ({ ...ulProps }: Props) => {
  const { patients, loading, selectedPatient, setSelectedPatient } = useContext(PatientsContext);

  if (loading) {
    return (
      <>
        <ul className="my-2.5 flex flex-grow flex-col gap-y-2" {...ulProps}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton variant="rectangular" className="!h-20 rounded-md" key={index} />
          ))}
        </ul>
        <Skeleton variant="rectangular" className="!h-9 rounded-md" />
      </>
    );
  }

  return (
    <>
      <ul className="my-2.5 flex flex-grow flex-col gap-y-2" {...ulProps}>
        {patients?.map((_patient) => (
          <PatientsListItem
            key={_patient.id}
            patient={_patient}
            selected={_patient.id === selectedPatient?.id}
            onClick={() => setSelectedPatient?.(_patient)}
          />
        ))}
      </ul>
      <div className="mr-auto md:w-full">
        <Pagination
          variant="outlined"
          shape="rounded"
          count={12}
          color="primary"
          renderItem={(item) => (
            <PaginationItem components={{ previous: CaretLeft, next: CaretRight }} {...item} />
          )}
        />
      </div>
    </>
  );
};

export default PatientsListItems;
