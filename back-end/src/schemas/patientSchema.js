const yup = require('yup');

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
  address: yup
    .object({
      zipCode: yup.string().required('Forneca um CEP'),
      state: yup.string().required('Forneca um Estado'),
      city: yup.string().required('Forneca uma Cidade'),
      neighborhood: yup.string().required('Forneca um Bairro'),
      street: yup.string().required('Forneca uma Rua'),
      streetNumber: yup.string().required('Forneca um Número'),
      complement: yup.string(),
    })
    .default(undefined),
});

module.exports = patientSchema;
