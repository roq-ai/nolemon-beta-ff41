import * as yup from 'yup';

export const invoiceValidationSchema = yup.object().shape({
  amount: yup.number().integer(),
  shop_id: yup.string().nullable(),
});
