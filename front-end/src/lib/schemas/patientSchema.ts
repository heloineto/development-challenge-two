import * as yup from 'yup';
import addressSchema from './addressSchema';

const getTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return tomorrow;
};

const patientSchema = yup.object().shape({
  fullName: yup.string().required('Forneça o nome completo'),
  birthdate: yup
    .date()
    .typeError('Esta data não e valida')
    .max(getTomorrow(), 'A data de nascimento deve ser anterior à data atual'),
  email: yup.string().email('Forneça um e-mail válido'),
  address: addressSchema.optional(),
});

export default patientSchema;
