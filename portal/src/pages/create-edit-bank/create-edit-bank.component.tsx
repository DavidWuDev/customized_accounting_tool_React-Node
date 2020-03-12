import { ScrollView, View } from '@app/components';
import { BankService } from '@app/services';
import { IBank } from '@app/types';
import { TextField } from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import CreateEditData, { ActionFooter } from '../create-edit-data';

const validationSchema = yup.object().shape<IBank>({
  _id: yup.string().nullable(),
  name: yup.string().required('Please enter bank name'),
  aliasName: yup.string().required('Please enter alias name'),
});

const CreateEditBank: React.FC = () => {
  return (
    <CreateEditData
      title="Bank"
      name="bank"
      service={BankService}
      renderForm={(record: IBank, onSubmit) => {
        const initialValues: IBank = {
          _id: null,
          name: '',
          aliasName: '',
        };

        if (record) {
          initialValues._id = record._id;
          initialValues.name = record.name;
          initialValues.aliasName = record.aliasName;
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
                        label="Bank name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        helperText={touched.name && errors.name}
                        error={touched.name && Boolean(errors.name)}
                      />
                      <TextField
                        label="Alias name"
                        name="aliasName"
                        value={values.aliasName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        helperText={touched.aliasName && errors.aliasName}
                        error={touched.aliasName && Boolean(errors.aliasName)}
                      />
                    </View>
                  </ScrollView>
                  <ActionFooter name="bank" title="Bank" isSubmitting={isSubmitting} isValid={isValid} submitCount={submitCount} />
                </form>
              )}
          </Formik>
        );
      }}
    />
  );
};

export default CreateEditBank;
