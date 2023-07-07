import * as yup from 'yup';

export const customerValidationSchema = yup.object().shape({
  profile: yup.string(),
  shop_id: yup.string().nullable(),
});
