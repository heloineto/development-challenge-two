import React from 'react';
import { Form } from 'react-final-form';
import { makeValidate, TextField } from 'mui-rff';
import patientSchema from '../../../lib/schemas/patientSchema';

type PatientFormValues = {
  fullName: Patient['fullName'];
  birthdate: Patient['birthdate'];
  email: Patient['email'];
  phoneNumber: Patient['phoneNumber'];
  sex: string | null;
  smoker: string | null;
  nationality: string | null;
  maritalStatus: string | null;
  profession: Patient['profession'];
  motherFullName: Patient['motherFullName'];
  fatherFullName: Patient['fatherFullName'];
  profilePicture: string | undefined;
  notes: Patient['notes'];
};

type Props = ComponentProps<'div'>;

const PatientForm = ({ ...divProps }: Props) => {
  const onSubmit = async (values: PatientFormValues) => {
    console.log(values);
  };

  const initialValues = {};

  return (
    <div {...divProps}>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={makeValidate<Partial<PatientFormValues>>(patientSchema)}
      >
        {({ handleSubmit, form, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-x-4 p-4">
              <TextField label="Nome completo" name="fullName" size="medium" />
              <div className="h-10 w-24" />
            </div>
            <div className="border-t border-gray-200 p-5">
              <div className="grid grid-cols-1 gap-x-4 gap-y-[clamp(0.25rem,1.5rem,3rem)] sm:grid-cols-2 xl:grid-cols-3">
                {/* <SeamlessmDateField
                  name="birthdate"
                  label="Data de nascimento"
                  showError={showErrorOnBlur}
                />
                <TextField label="Email" name="email" /> */}
              </div>
            </div>
            {/* <div className="border-t border-gray-200 px-5 py-5">
              <SeamlessTextField
                label="Observações"
                name="notes"
                multiline
                minRows={2}
                maxRows={12}
              />
              <pre>{JSON.stringify(values, undefined, 2)}</pre>
            </div> */}
          </form>
        )}
      </Form>
    </div>
  );
};

export default PatientForm;
