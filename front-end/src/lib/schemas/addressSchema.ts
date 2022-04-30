import * as yup from 'yup';

const addressSchema = yup.object().shape({
  zipCode: yup.string().required('Forneca um CEP'),
  state: yup.string().required('Forneca um Estado'),
  city: yup.string().required('Forneca uma Cidade'),
  neighborhood: yup.string().required('Forneca um Bairro'),
  street: yup.string().required('Forneca uma Rua'),
  streetNumber: yup.string().required('Forneca um Número'),
  complement: yup.string(),
});

export default addressSchema;
