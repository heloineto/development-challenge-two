import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { DatePicker, makeValidate, TextField } from 'mui-rff';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import patientSchema from '../../../lib/schemas/patientSchema';
import AdressForm from '../../elements/forms/AdressForm';
import PrimaryButton from '../../elements/buttons/PrimaryButton';

type PatientFormValues = {
  fullName: Patient['fullName'];
  birthdate: Patient['birthdate'];
  email: Patient['email'];
};

type Props = ComponentProps<'form'>;

const PatientForm = ({ ...formProps }: Props) => {
  const [adress, setAdress] = useState<Adress | undefined>();

  const onSubmit = async (values: PatientFormValues) => {
    console.log(values);
  };

  const initialValues = {};

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={makeValidate<Partial<PatientFormValues>>(patientSchema)}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="flex h-full flex-col" {...formProps}>
          <div className="flex items-center gap-x-4 px-4 py-7">
            <TextField label="Nome completo" name="fullName" size="medium" required />
            <div className="h-10 w-24" />
          </div>
          <div className="flex flex-grow flex-col gap-10 border-t border-gray-200 px-4 pt-7 pb-4">
            <div className="flex gap-7">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  name="birthdate"
                  label="Data de nascimento"
                  inputFormat="dd/MM/yyyy"
                  InputProps={{ placeholder: 'dd/mm/aaaa' }}
                  disableFuture
                />
              </LocalizationProvider>
              <TextField label="Email" name="email" />
            </div>
            <AdressForm value={adress} onChange={(adress) => setAdress(adress)} />
            <PrimaryButton className="!mt-auto">Salvar</PrimaryButton>
          </div>
        </form>
      )}
    </Form>
  );
};

export default PatientForm;
