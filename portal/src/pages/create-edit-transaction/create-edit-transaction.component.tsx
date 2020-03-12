import { DataLookup, ScrollView } from '@app/components';
import { BankAccountService, CategoryService, TransactionService } from '@app/services';
import { ITransaction } from '@app/types';
import MomentUtils from '@date-io/moment';
import { Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Formik, FormikErrors, FormikTouched } from 'formik';
import React from 'react';
import * as yup from 'yup';
import CreateEditData, { ActionFooter } from '../create-edit-data';

const validationSchema = yup.object().shape<Partial<ITransaction>>({
  _id: yup.string().nullable(),
  amount: yup.number().required('Please enter amount'),
  bankAccount: yup.string().required('Please select bank account'),
  category: yup.string().nullable(),
  isPostDated: yup.boolean(),
  narration: yup.string().required('Please enter narration'),
  reference: yup.string(),
  transactionDate: yup.date().nullable().required('Please enter transaction date'),
  valueDate: yup.date().nullable().required('Please enter value date'),
});

const getControlProps = <T extends ITransaction>(handleChange: any, handleBlur: any, values: T, touched: FormikTouched<T>, errors: FormikErrors<T>) => (name: keyof ITransaction) => {
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
      title="Transaction"
      name="transaction"
      service={TransactionService}
      renderForm={(record: ITransaction, onSubmit) => {
        const initialValues: ITransaction = {
          _id: null,
          name: '',
          amount: 0,
          bankAccount: '' as any,
          category: '',
          isPostDated: true,
          narration: '',
          reference: '',
          transactionDate: null,
          valueDate: null,
        };

        if (record) {
          initialValues._id = record._id;
          initialValues.amount = record.amount;
          initialValues.bankAccount = record.bankAccount;
          initialValues.category = record.category;
          initialValues.isPostDated = record.isPostDated;
          initialValues.narration = record.narration;
          initialValues.reference = record.reference;
          initialValues.transactionDate = record.transactionDate;
          initialValues.valueDate = record.valueDate;
        }

        return (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              if (!values.category) {
                values.category = null;
              }
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
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <Grid container spacing={4} style={{ paddingLeft: 32, paddingRight: 32, paddingTop: 16 }}>
                        <Grid item xs={12} md={6}>
                          <DataLookup
                            service={BankAccountService}
                            fullWidth
                            label="Bank account"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                            {...getInputProps('bankAccount')}
                          />
                          <KeyboardDatePicker
                            disableToolbar
                            fullWidth
                            inputVariant="outlined"
                            variant="inline"
                            format="DD-MM-YYYY"
                            margin="normal"
                            label="Transaction date"
                            InputLabelProps={{ shrink: true }}
                            {...getInputProps('transactionDate')}
                            value={values.transactionDate}
                            onChange={(date) => setFieldValue('transactionDate', date ? date.toDate() : null)}
                          />
                          <KeyboardDatePicker
                            disableToolbar
                            fullWidth
                            inputVariant="outlined"
                            variant="inline"
                            format="DD-MM-YYYY"
                            margin="normal"
                            label="Value date"
                            InputLabelProps={{ shrink: true }}
                            {...getInputProps('valueDate')}
                            value={values.valueDate}
                            onChange={(date) => setFieldValue('valueDate', date ? date.toDate() : null)}
                          />
                          <TextField
                            fullWidth
                            label="Amount"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                            {...getInputProps('amount')}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Narration"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                            {...getInputProps('narration')}
                          />
                          <TextField
                            fullWidth
                            label="Reference"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                            {...getInputProps('reference')}
                          />
                          <DataLookup
                            service={CategoryService}
                            fullWidth
                            label="Category"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                            predata={[{
                              _id: '',
                              name: '',
                            }]}
                            {...getInputProps('category')}
                          />
                          <FormControlLabel
                            style={{ padding: '18.5px 14px' }}
                            control={<Checkbox name="isPostDated" checked={values.isPostDated} onChange={handleChange} />}
                            label="Post dated"
                            disabled
                          />
                        </Grid>
                      </Grid>
                      {/* <View flexGrow flexDirection="column" justifyContent="center" style={{ minWidth: 360, maxWidth: 360, margin: '0px auto', overflow: 'unset' }}>
                    </View> */}
                    </MuiPickersUtilsProvider>
                  </ScrollView>
                  <ActionFooter name="transaction" title="Transaction" isSubmitting={isSubmitting} isValid={isValid} submitCount={submitCount} />
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
