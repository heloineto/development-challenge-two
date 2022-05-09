import React, { useContext } from 'react';
import classNames from 'clsx';
import { Button, Pagination } from '@mui/material';
import { UserCirclePlus } from 'phosphor-react';
import PatientsListItems from './PatientsList.Items';
import PatientsContext from '../../../lib/contexts/PatientsContext';

type Props = ComponentProps<'div'>;

const PatientsList = ({ className, ...divProps }: Props) => {
  const { selectedPatient, setSelectedPatient } = useContext(PatientsContext);

  return (
    <div
      className={classNames(
        'flex h-[17.5rem] flex-col overflow-y-hidden rounded-lg bg-white p-4 shadow lg:h-full',
        className,
      )}
      {...divProps}
    >
      <div className="flex h-full flex-col">
        <Button
          className={classNames(
            selectedPatient === null && '!ring-2 !ring-blue-500 !ring-offset-2',
            'flex !h-20 w-full flex-shrink-0 flex-col items-center justify-center !border-2 !border-dashed !border-slate-400 !bg-white py-2 shadow-sm hover:border-slate-600',
          )}
          onClick={() => setSelectedPatient?.(null)}
        >
          <UserCirclePlus className="h-8 w-auto text-slate-800" />
          <span className="block text-sm font-semibold text-slate-900">
            Cadastrar novo paciente
          </span>
        </Button>
        <PatientsListItems />
        <Pagination count={10} />
      </div>
    </div>
  );
};

export default PatientsList;
