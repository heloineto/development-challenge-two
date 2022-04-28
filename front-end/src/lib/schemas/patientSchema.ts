import * as yup from 'yup';

const patientSchema = yup.object().shape({
  fullName: yup.string().required('Forneça o nome completo'),
  birthdate: yup
    .date()
    .typeError('Esta data não e valida')
    .max(new Date(), 'A data de nascimento deve ser anterior à data atual'),
  email: yup.string().email('Forneça um e-mail válido'),
  phoneNumber: yup.string(),
  adress: yup.string(),
  profilePicture: yup.string(),
  sex: yup.string().nullable(),
  smoker: yup.string().nullable(),
  nationality: yup.string().nullable(),
  maritalStatus: yup.string().nullable(),
  profession: yup.string(),
  motherFullName: yup.string(),
  fatherFullName: yup.string(),
  notes: yup.string(),
});

export default patientSchema;
