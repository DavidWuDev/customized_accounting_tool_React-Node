import { DataLookup, ScrollView, View } from '@app/components';
import { BankService, StatementTemplateService } from '@app/services';
import { IStatementTemplate } from '@app/types';
import { TextField } from '@material-ui/core';
import { Formik, FormikErrors, FormikTouched } from 'formik';
import React from 'react';
import * as yup from 'yup';
import CreateEditData, { ActionFooter } from '../create-edit-data';

const validationSchema = yup.object().shape<IStatementTemplate>({
  _id: yup.string().nullable(),
  bank: yup.string().required('Please select bank'),
  name: yup.string().required('Please enter name'),
  code: yup.string().required('Please enter code'),
  extension: yup.string().required('Please enter file extensions'),
});

const getControlProps = <T extends IStatementTemplate>(handleChange: any, handleBlur: any, values: T, touched: FormikTouched<T>, errors: FormikErrors<T>) => (name: keyof IStatementTemplate) => {
  return {
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    helperText: !touched[name] ? ' ' : touched[name] && (errors[name] || ' '),
    error: touched[name] && Boolean(errors[name]),
  };
};

const CreateEditStatementTemplate: React.FC = () => {
  return (
    <CreateEditData
      title="Statement template"
      name="statement-template"
      service={StatementTemplateService}
      renderForm={(record: IStatementTemplate, onSubmit) => {
        const initialValues: IStatementTemplate = {
          _id: null,
          name: '',
          code: '',
          extension: '',
          bank: '',
        };

        if (record) {
          initialValues._id = record._id;
          initialValues.name = record.name;
          initialValues.code = record.code;
          initialValues.extension = record.extension;
          initialValues.bank = record.bank;
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
            }) => {
              const getInputProps = getControlProps(handleChange, handleBlur, values, touched, errors);
              return (
                <form noValidate autoComplete="off" style={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: 'column' }} onSubmit={handleSubmit}>
                  <ScrollView>
                    <View flexGrow flexDirection="column" justifyContent="center" style={{ minWidth: 360, maxWidth: 360, margin: '0px auto', overflow: 'unset' }}>
                      <DataLookup
                        service={BankService}
                        fullWidth
                        label="Bank"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        {...getInputProps('bank')}
                      />
                      <TextField
                        fullWidth
                        label="Name"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        {...getInputProps('name')}
                      />
                      <TextField
                        fullWidth
                        label="code"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        {...getInputProps('code')}
                      />
                      <TextField
                        fullWidth
                        label="File extension"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        {...getInputProps('extension')}
                      />
                    </View>
                  </ScrollView>
                  <ActionFooter name="statement-template" title="Statement template" isSubmitting={isSubmitting} isValid={isValid} submitCount={submitCount} />
                </form>
              );
            }}
          </Formik>
        );
      }}
    />
  );
};

export default CreateEditStatementTemplate;
