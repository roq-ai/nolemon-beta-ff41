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
import { createTechnician } from 'apiSdk/technicians';
import { Error } from 'components/error';
import { technicianValidationSchema } from 'validationSchema/technicians';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { TechnicianInterface } from 'interfaces/technician';

function TechnicianCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TechnicianInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTechnician(values);
      resetForm();
      router.push('/technicians');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TechnicianInterface>({
    initialValues: {
      efficiency_rating: 0,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: technicianValidationSchema,
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
            Create Technician
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="efficiency_rating" mb="4" isInvalid={!!formik.errors?.efficiency_rating}>
            <FormLabel>Efficiency Rating</FormLabel>
            <NumberInput
              name="efficiency_rating"
              value={formik.values?.efficiency_rating}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('efficiency_rating', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.efficiency_rating && <FormErrorMessage>{formik.errors?.efficiency_rating}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
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
    entity: 'technician',
    operation: AccessOperationEnum.CREATE,
  }),
)(TechnicianCreatePage);
