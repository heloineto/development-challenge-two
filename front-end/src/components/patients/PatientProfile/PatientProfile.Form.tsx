import React from 'react';
import { Form } from 'react-final-form';
import { DatePicker, makeValidate, TextField } from 'mui-rff';
import patientSchema from '../../../lib/schemas/patientSchema';
import PrimaryButton from '../../elements/buttons/PrimaryButton';
import { Calendar } from 'phosphor-react';
import AddressField from '../../elements/fields/AddressField';
import api from '../../../lib/api';

type PatientFormValues = {
  fullName: Patient['fullName'];
  birthdate: Patient['birthdate'];
  email: Patient['email'];
  address: Partial<Patient['address']>;
};

type Props = ComponentProps<'form'>;

const PatientForm = ({ ...formProps }: Props) => {
  const onSubmit = async (values: PatientFormValues) => {
    const response = await api.post('patients', values);

    console.log('response', response);
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
              <DatePicker
                name="birthdate"
                label="Data de nascimento"
                inputFormat="dd/MM/yyyy"
                components={{
                  OpenPickerIcon: () => <Calendar className="text-slate-500" weight="duotone" />,
                }}
                disableFuture
              />
              <TextField label="Email" name="email" />
            </div>
            <AddressField name="adress" />
          </div>
          <div className="mt-auto border-t border-gray-200 px-4 pt-5 pb-4">
            <PrimaryButton type="submit" className="">
              Salvar
            </PrimaryButton>
          </div>
        </form>
      )}
    </Form>
  );
};

export default PatientForm;
