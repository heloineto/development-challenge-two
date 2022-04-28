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
            <div className="flex items-center gap-x-5 p-5">
              <TextField label="Nome completo" name="fullName" size="medium" />
            </div>
            {/* <div className="border-t border-gray-200 p-5">
              <div className="grid grid-cols-1 gap-x-4 gap-y-[clamp(0.25rem,1.5rem,3rem)] sm:grid-cols-2 xl:grid-cols-3">
                <div className="relative pb-[100%] sm:col-span-1 sm:row-span-3 xl:row-span-4">
                  <ProfilePicture
                    className="absolute h-full w-full"
                    profilePicture={profilePicture}
                    setProfilePicture={setProfilePicture}
                  />
                </div>
                <SeamlessmDateField
                  name="birthdate"
                  label="Data de nascimento"
                  showError={showErrorOnBlur}
                />
                <SeamlessSexField label="Sexo" name="sex" />
                <SeamlessTextField label="Email" name="email" />
                <SeamlessPhoneField label="Telefone para contato" name="phoneNumber" />
                <SeamlessmMaritalStatusField label="Estado civil" name="maritalStatus" />
                <SeamlessNationalityField
                  label="Nacionalidade"
                  name="nationality"
                  currValue={values.nationality}
                />
                <SeamlessTextField label="Nome do pai" name="fatherFullName" />
                <SeamlessTextField label="Nome da mãe" name="motherFullName" />
                <SeamlessTextField label="Profissão" name="profession" />
                <SeamlessSmokerField label="Tabagista" name="smoker" />
              </div>
            </div>
            <div className="border-t border-gray-200 px-5 py-5">
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
