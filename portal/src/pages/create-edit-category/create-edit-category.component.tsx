import { ScrollView, View } from '@app/components';
import { getCategoryNature } from '@app/helpers/common.helper';
import { CategoryService } from '@app/services';
import { ICategory } from '@app/types';
import { MenuItem, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import CreateEditData, { ActionFooter } from '../create-edit-data';

const validationSchema = yup.object().shape<ICategory>({
  _id: yup.string().nullable(),
  name: yup.string().required('Please enter category name'),
});

const CreateEditCategory: React.FC = () => {
  const natures = ['DI', 'DE', 'II', 'IE'];
  return (
    <CreateEditData
      title="Category"
      name="category"
      pluralName="categories"
      service={CategoryService}
      renderForm={(record: ICategory, onSubmit) => {
        const initialValues: ICategory = {
          _id: null,
          name: '',
        };

        if (record) {
          initialValues._id = record._id;
          initialValues.name = record.name;
          initialValues.nature = record.nature;
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
                        autoFocus
                        label="Category name"
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
                        select
                        label="Nature"
                        name="nature"
                        value={values.nature}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                      >
                        <MenuItem value=""></MenuItem>
                        {natures.map(x => (
                          <MenuItem key={x} value={x}>{getCategoryNature(x)}</MenuItem>
                        ))}
                      </TextField>
                    </View>
                  </ScrollView>
                  <ActionFooter name="category" title="Category" isSubmitting={isSubmitting} isValid={isValid} submitCount={submitCount} />
                </form>
              )}
          </Formik>
        );
      }}
    />
  );
};

export default CreateEditCategory;
