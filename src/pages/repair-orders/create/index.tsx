import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createRepairOrder } from 'apiSdk/repair-orders';
import { Error } from 'components/error';
import { repairOrderValidationSchema } from 'validationSchema/repair-orders';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { TechnicianInterface } from 'interfaces/technician';
import { ShopInterface } from 'interfaces/shop';
import { getTechnicians } from 'apiSdk/technicians';
import { getShops } from 'apiSdk/shops';
import { RepairOrderInterface } from 'interfaces/repair-order';

function RepairOrderCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RepairOrderInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRepairOrder(values);
      resetForm();
      router.push('/repair-orders');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RepairOrderInterface>({
    initialValues: {
      status: '',
      technician_id: (router.query.technician_id as string) ?? null,
      shop_id: (router.query.shop_id as string) ?? null,
    },
    validationSchema: repairOrderValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Repair Order
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<TechnicianInterface>
            formik={formik}
            name={'technician_id'}
            label={'Select Technician'}
            placeholder={'Select Technician'}
            fetcher={getTechnicians}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.efficiency_rating}
              </option>
            )}
          />
          <AsyncSelect<ShopInterface>
            formik={formik}
            name={'shop_id'}
            label={'Select Shop'}
            placeholder={'Select Shop'}
            fetcher={getShops}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'repair_order',
    operation: AccessOperationEnum.CREATE,
  }),
)(RepairOrderCreatePage);
