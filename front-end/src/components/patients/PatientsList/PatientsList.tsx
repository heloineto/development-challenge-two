import React, { useContext } from 'react';
import classNames from 'clsx';
import PatientSearch from '../PatientSearch';
import { Button } from '@mui/material';
import { UserCirclePlus } from 'phosphor-react';
import PatientsListItems from './PatientsList.Items';
import PatientsContext from '../../../lib/contexts/PatientsContext';

type Props = ComponentProps<'div'>;

const PatientsList = ({ className, ...divProps }: Props) => {
  const { setSelectedPatient } = useContext(PatientsContext);

  return (
    <div
      className={classNames(
        'flex flex-col overflow-y-hidden rounded-lg bg-white p-4 shadow',
        className,
      )}
      {...divProps}
    >
      <div className="flex h-full flex-col">
        <PatientSearch />
        <Button
          className="!mt-2.5 flex h-20 w-full flex-col items-center justify-center !border-2 !border-dashed !border-slate-400 !bg-white px-4 py-2 shadow-sm hover:border-slate-600"
          onClick={() => setSelectedPatient?.(null)}
        >
          <UserCirclePlus className="h-8 w-auto text-slate-800" />
          <span className="block text-sm font-semibold text-slate-900">
            Cadastrar novo paciente
          </span>
        </Button>
        <PatientsListItems />
      </div>
    </div>
  );
};

export default PatientsList;
