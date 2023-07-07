import * as yup from 'yup';

export const repairOrderValidationSchema = yup.object().shape({
  status: yup.string(),
  technician_id: yup.string().nullable(),
  shop_id: yup.string().nullable(),
});
