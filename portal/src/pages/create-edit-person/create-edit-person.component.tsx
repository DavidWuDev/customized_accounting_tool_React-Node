import { ScrollView, View } from '@app/components';
import { PersonService } from '@app/services';
import { IPerson } from '@app/types';
import { TextField } from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import CreateEditData, { ActionFooter } from '../create-edit-data';

const validationSchema = yup.object().shape<Partial<IPerson>>({
  _id: yup.string().nullable(),
  firstName: yup.string().required('Please enter first name'),
  lastName: yup.string().required('Please enter last name'),
  pan: yup.string().required('Please enter pan number').matches(/[A-Z]{5}\d{4}[A-Z]/, 'Please enter valid pan number'),
});

const CreateEditPerson: React.FC = () => {
  return (
    <CreateEditData
      title="Person"
      name="person"
      service={PersonService}
      renderForm={(record: IPerson, onSubmit) => {
        const initialValues: IPerson = {
          _id: null,
          name: '',
          firstName: '',
          lastName: '',
          pan: '',
          monthlyIncome: 0,
        };

        if (record) {
          initialValues._id = record._id;
          initialValues.firstName = record.firstName;
          initialValues.lastName = record.lastName;
          initialValues.pan = record.pan;
          initialValues.monthlyIncome = record.monthlyIncome;
        }

        return (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await onSubmit(values);
              setSubmitting(false);
            }}
          >
            {({
              handleSubmit,
              values,
              handleChange,
              handleBlur,
              setFieldValue,
              isSubmitting,
              submitCount,
              isValid,
              touched,
              errors,
            }) => (
                <form noValidate autoComplete="off" style={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: 'column' }} onSubmit={handleSubmit}>
                  <ScrollView>
                    <View flexGrow flexDirection="column" justifyContent="center" style={{ minWidth: 360, maxWidth: 360, margin: '0px auto' }}>
                      <TextField
                        label="First name"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        helperText={touched.firstName && errors.firstName}
                        error={touched.firstName && Boolean(errors.firstName)}
                      />
                      <TextField
                        label="Last name"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        helperText={touched.lastName && errors.lastName}
                        error={touched.lastName && Boolean(errors.lastName)}
                      />
                      <TextField
                        label="PAN"
                        name="pan"
                        value={values.pan}
                        onChange={(e) => {
                          const value = e.target.value.toUpperCase();
                          setFieldValue('pan', value);
                        }}
                        onBlur={handleBlur}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        helperText={touched.pan && errors.pan}
                        error={touched.pan && Boolean(errors.pan)}
                      />
                      <TextField
                        label="Monthly income"
                        name="monthlyIncome"
                        type="number"
                        value={values.monthlyIncome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        helperText={touched.monthlyIncome && errors.monthlyIncome}
                        error={touched.monthlyIncome && Boolean(errors.monthlyIncome)}
                      />
                    </View>
                  </ScrollView>
                  <ActionFooter name="person" title="Person" isSubmitting={isSubmitting} isValid={isValid} submitCount={submitCount} />
                </form>
              )}
          </Formik>
        );
      }}
    />
  );
};

export default CreateEditPerson;
