import * as yup from 'yup';

export const appointmentValidationSchema = yup.object().shape({
  time: yup.date(),
  shop_id: yup.string().nullable(),
});
