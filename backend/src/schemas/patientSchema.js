const yup = require('yup');

const patientSchema = yup.object().shape({
  fullName: yup.string().required('Forneça o nome completo'),
  birthdate: yup.string(),
  email: yup.string().email('Forneça um e-mail válido'),
  picture: yup.string(),
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
    .notRequired()
    .default(undefined),
});

module.exports = patientSchema;
