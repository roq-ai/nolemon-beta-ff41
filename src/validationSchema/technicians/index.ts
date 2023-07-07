import * as yup from 'yup';

export const technicianValidationSchema = yup.object().shape({
  efficiency_rating: yup.number().integer(),
  user_id: yup.string().nullable(),
});
