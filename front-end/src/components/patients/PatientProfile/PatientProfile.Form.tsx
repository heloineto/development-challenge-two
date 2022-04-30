import React from 'react';
import { Form } from 'react-final-form';
import { DatePicker, makeValidate, TextField } from 'mui-rff';
import patientSchema from '../../../lib/schemas/patientSchema';
import PrimaryButton from '../../elements/buttons/PrimaryButton';
import { Calendar } from 'phosphor-react';
import AddressField from '../../elements/fields/AddressField';
import api from '../../../lib/api';
import PictureField from '../../elements/fields/PictureField';

type PatientFormValues = {
  fullName: string;
  birthdate?: Date;
  email?: string;
  address?: Partial<Address>;
  picture?: string;
};

type Props = ComponentProps<'form'>;

const PatientForm = ({ ...formProps }: Props) => {
  const onSubmit = async (values: PatientFormValues) => {
    const response = await api.post('patients', JSON.stringify(values));

    console.log('response', response);
  };

  const initialValues = {};

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={makeValidate<Partial<PatientFormValues>>(patientSchema)}
    >
      {({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} className="flex h-full flex-col" {...formProps}>
          <div className="flex items-center gap-x-4 px-4 py-7">
            <TextField label="Nome completo" name="fullName" size="medium" required />
            <div className="h-10 w-24" />
          </div>
          <div className="flex flex-col gap-10 border-t border-slate-200 px-4 pt-7 pb-4">
            <div className="flex flex-col gap-10 md:flex-row">
              <div className="aspect-square md:w-1/3">
                <PictureField name="picture" />
              </div>
              <div className="flex flex-col gap-10 md:w-2/3">
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
            </div>
            <AddressField name="adress" />
          </div>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <div className="mt-auto border-t border-slate-200 px-4 pt-5 pb-4">
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
