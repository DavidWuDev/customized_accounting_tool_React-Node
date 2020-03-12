import { DataLookup, ScrollView } from '@app/components';
import { BankAccountService, BankService, PersonService } from '@app/services';
import { IBankAccount } from '@app/types';
import { Grid, TextField } from '@material-ui/core';
import { Formik, FormikErrors, FormikTouched } from 'formik';
import React from 'react';
import * as yup from 'yup';
import CreateEditData, { ActionFooter } from '../create-edit-data';

const validationSchema = yup.object().shape<Partial<IBankAccount>>({
  _id: yup.string().nullable(),
  accountHolder: yup.string().required('Please select account holder'),
  accountName: yup.string().required('Please enter name as per account'),
  accountNumber: yup.string().required('Please enter account number'),
  bank: yup.string().required('Please select bank'),
  branch: yup.string().required('Please enter branch'),
  bankAccountAliasName: yup.string().required('Please enter alias name'),
  ifsc: yup.string().required('Please enter ifsc code'),
  openingBalance: yup.number().required('Please enter opening balance').min(0, 'Opening balance can\'t be negative'),
});

const getControlProps = <T extends IBankAccount>(handleChange: any, handleBlur: any, values: T, touched: FormikTouched<T>, errors: FormikErrors<T>) => (name: keyof IBankAccount) => {
  return {
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    helperText: !touched[name] ? ' ' : touched[name] && (errors[name] || ' '),
    error: touched[name] && Boolean(errors[name]),
  };
};

const CreateEditPerson: React.FC = () => {
  return (
    <CreateEditData
      title="Bank account"
      name="bank-account"
      service={BankAccountService}
      renderForm={(record: IBankAccount, onSubmit) => {
        const initialValues: IBankAccount = {
          _id: null,
          name: '',
          accountHolder: '',
          accountName: '',
          accountNumber: '',
          bank: '',
          bankAccountAliasName: '',
          branch: '',
          ifsc: '',
          openingBalance: 0,
        };

        if (record) {
          initialValues._id = record._id;
          initialValues.accountHolder = record.accountHolder;
          initialValues.accountName = record.accountName;
          initialValues.accountNumber = record.accountNumber;
          initialValues.bank = record.bank;
          initialValues.bankAccountAliasName = record.bankAccountAliasName;
          initialValues.branch = record.branch;
          initialValues.ifsc = record.ifsc;
          initialValues.openingBalance = record.openingBalance;
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
                    <Grid container spacing={4} style={{ paddingLeft: 32, paddingRight: 32, paddingTop: 16 }}>
                      <Grid item xs={12} md={6}>
                        <DataLookup
                          service={PersonService}
                          fullWidth
                          label="Account holder"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          margin="normal"
                          variant="outlined"
                          {...getInputProps('accountHolder')}
                        />
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
                          label="Name as per account"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          margin="normal"
                          variant="outlined"
                          {...getInputProps('accountName')}
                        />
                        <TextField
                          fullWidth
                          label="Account number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          margin="normal"
                          variant="outlined"
                          {...getInputProps('accountNumber')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Alias name"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          margin="normal"
                          variant="outlined"
                          {...getInputProps('bankAccountAliasName')}
                        />
                        <TextField
                          fullWidth
                          label="Branch"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          margin="normal"
                          variant="outlined"
                          {...getInputProps('branch')}
                        />
                        <TextField
                          fullWidth
                          label="IFSC code"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          margin="normal"
                          variant="outlined"
                          {...getInputProps('ifsc')}
                          onChange={(e) => {
                            const value = e.target.value.toUpperCase();
                            setFieldValue('ifsc', value);
                          }}
                        />
                        <TextField
                          fullWidth
                          type="number"
                          label="Opening balance"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          margin="normal"
                          variant="outlined"
                          {...getInputProps('openingBalance')}
                        />
                      </Grid>
                    </Grid>
                    {/* <View flexGrow flexDirection="column" justifyContent="center" style={{ minWidth: 360, maxWidth: 360, margin: '0px auto', overflow: 'unset' }}>
                    </View> */}
                  </ScrollView>
                  <ActionFooter name="bank-account" title="Bank account" isSubmitting={isSubmitting} isValid={isValid} submitCount={submitCount} />
                </form>
              );
            }}
          </Formik>
        );
      }}
    />
  );
};

export default CreateEditPerson;
