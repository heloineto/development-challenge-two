import React from 'react';
import classNames from 'clsx';
import PatientSearch from '../PatientSearch';
import { Button, Pagination, PaginationItem } from '@mui/material';
import { CaretLeft, CaretRight, UserCirclePlus } from 'phosphor-react';

type Props = ComponentProps<'div'>;

const PatientsList = ({ className, ...divProps }: Props) => {
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
        <div className="my-2.5 flex flex-grow flex-col gap-y-2">
          <Button
            className="mt-0 flex h-20 w-full flex-col items-center justify-center !border-2 !border-dashed !border-slate-500 !bg-white px-4 py-2 shadow-sm hover:border-slate-600"
            // onClick={onClick}
          >
            <UserCirclePlus className="h-8 w-auto text-slate-800" />
            <span className="block text-sm font-semibold text-slate-900">
              Cadastrar novo paciente
            </span>
          </Button>
        </div>
        <Pagination
          variant="outlined"
          shape="rounded"
          count={12}
          color="primary"
          siblingCount={2}
          renderItem={(item) => (
            <PaginationItem components={{ previous: CaretLeft, next: CaretRight }} {...item} />
          )}
        />
      </div>
    </div>
  );
};

export default PatientsList;
