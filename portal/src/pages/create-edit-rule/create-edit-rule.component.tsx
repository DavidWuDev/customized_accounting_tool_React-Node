import { DataLookup, ScrollView, View } from '@app/components';
import { CategoryService, RuleService } from '@app/services';
import { ICondition, IRule, ITransaction } from '@app/types';
import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import CreateEditData, { ActionFooter } from '../create-edit-data';
import ConditionGroup from './condition-group.component';
import { IGroupValue, IRowValue } from './condition-rule.types';

interface IFormValue {
  _id: string;
  name: string;
  category: string;
  order?: number;
  inactive?: boolean;
  condition: IGroupValue;
}

const initConditionValue: IRowValue = {
  field: '',
  operator: '',
  value: '',
};

const initFormValue: IFormValue = {
  _id: null,
  name: '',
  category: '',
  order: 0,
  inactive: false,
  condition: {
    type: '_$and',
    conditions: [{ ...initConditionValue }],
  },
};

export const validationSchema = yup.object().shape<IFormValue>({
  _id: yup.string().nullable(),
  name: yup.string().required('Please enter name'),
  category: yup.string().required('Please select category'),
  order: yup.number(),
  inactive: yup.boolean(),
  condition: yup.mixed().test('condition-test', 'Invalid condition', (value: IGroupValue) => {

    const isValidCondition = (condition: IRowValue) => {
      return Boolean(condition.field) && Boolean(condition.operator) && Boolean(condition.value);
    };

    const isValidGroup = (group: IGroupValue) => {
      return group.conditions.every((c: any) => {
        if ((c as IGroupValue).conditions) {
          return isValidGroup((c as IGroupValue));
        } else {
          return isValidCondition((c as IRowValue));
        }
      });
    };

    const valid = value.conditions.length > 0 && isValidGroup(value);
    if (valid) {
      return true;
    }

    return new yup.ValidationError('Condition is not valid', null, 'condition');
  }),
});

const transformConditionDbToUi = (condition: ICondition<ITransaction>) => {
  if (condition._$and || condition._$or) {
    const operator = condition._$and ? '_$and' : '_$or';

    return {
      type: operator,
      conditions: condition[operator].map(c => transformConditionDbToUi(c)),
    };
  } else {
    const c = condition;
    const field = Object.keys(c)[0];
    const operator = Object.keys(c[field])[0];
    const value = c[field][operator];
    return {
      field,
      operator,
      value: value === null ? 'null' : value,
    } as IRowValue;
  }
};

const transformConditionUiToDb = (condition: IGroupValue) => {
  return {
    [condition.type]: (condition.conditions as any[]).map((c: any) => {
      if ((c as IGroupValue).conditions) {
        return transformConditionUiToDb(c);
      } else {
        const condition = c as IRowValue;
        return {
          [condition.field]: {
            [condition.operator]: c.value === 'null' ? null : c.value,
          },
        };
      }
    }),
  };
};

const CreateEditRule: React.FC = () => {
  return (
    <CreateEditData
      title="Rule"
      name="rule"
      service={RuleService}
      renderForm={(record: IRule, onSubmit: (record: IRule) => Promise<void>) => {
        const initialValues = { ...initFormValue };

        if (record) {
          initialValues._id = record._id;
          initialValues.name = record.name;
          initialValues.order = record.order || 0;
          initialValues.inactive = record.inactive;
          initialValues.condition = transformConditionDbToUi(record.condition);
          initialValues.category = record.payload.category;
        }

        return (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await onSubmit({
                _id: values._id,
                name: values.name,
                actionType: 'update_record',
                condition: transformConditionUiToDb(values.condition),
                payload: {
                  category: values.category,
                },
                order: values.order,
                inactive: values.inactive,
              });
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
              error,
            }) => (
                <form noValidate autoComplete="off" style={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: 'column' }} onSubmit={handleSubmit}>
                  <ScrollView>
                    <Grid container spacing={4} style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 16 }}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          label="Name"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.name && errors.name}
                          error={touched.name && Boolean(errors.name)}
                        />
                        <DataLookup
                          service={CategoryService}
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          label="New category"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          name="category"
                          value={values.category}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.category && errors.category}
                          error={touched.category && Boolean(errors.category)}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          type="number"
                          margin="normal"
                          variant="outlined"
                          label="Order"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          name="order"
                          value={values.order}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.order && errors.order}
                          error={touched.order && Boolean(errors.order)}
                        />
                        <FormControlLabel
                          style={{ padding: '18.5px 0px' }}
                          control={<Checkbox name="inactive" checked={values.inactive} onChange={handleChange} />}
                          label="Inactive"
                        />
                      </Grid>
                    </Grid>
                    <div style={{ padding: 16 }}>
                      <div style={{ marginTop: 32 }}>
                        <Typography variant="subtitle2">Conditions</Typography>
                      </div>
                      <View style={{ alignItems: 'flex-start', borderWidth: 1, borderStyle: 'solid', borderColor: errors.condition && submitCount > 0 ? 'red' : 'white' }}>
                        <ConditionGroup
                          group={values.condition}
                          onChange={(value) => setFieldValue('condition', value)}
                          root
                        />
                        <View style={{ marginTop: 16 }}>
                          <Button variant="outlined" onClick={() => setFieldValue('condition', { ...values.condition, conditions: [...values.condition.conditions, { ...initConditionValue }] })}>Add condition</Button>
                        </View>
                      </View>
                    </div>
                  </ScrollView>
                  <ActionFooter name="rule" title="Rule" isSubmitting={isSubmitting} isValid={isValid} submitCount={submitCount} />
                </form>
              )}
          </Formik>
        );
      }}
    />
  );
};

export default CreateEditRule;
