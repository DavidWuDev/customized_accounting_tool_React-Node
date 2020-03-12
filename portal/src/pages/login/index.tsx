import { AppLogo } from '@app/assets/icons';
import { View } from '@app/components';
import { AuthService } from '@app/services';
import { Button, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import * as QueryString from 'querystring';
import React, { useEffect, useState } from 'react';
import { RouteChildrenProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import * as yup from 'yup';

const useStyles = makeStyles((theme: Theme) => ({
  leftLayout: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: 160,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  rightLayout: {
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
    [theme.breakpoints.down('sm')]: {
      flex: 1,
    },
    padding: 32,
    overflowY: 'auto',
  },
}));

interface IFormValue {
  username: string;
  password: string;
}

const initialValues: IFormValue = {
  username: '',
  password: '',
};

export const validationSchema = yup.object().shape<IFormValue>({
  username: yup.string().required('Please enter username'),
  password: yup.string().required('Please enter password'),
});

const Login: React.FC<RouteChildrenProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const classes = useStyles(props);

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated) {
    const redirectUrl: string = QueryString.parse(
      props.location.search,
    ).redirect as string || '/';

    return <Redirect to={redirectUrl} />;
  }

  return (
    <View flexDirection="row" flexGrow>
      <View flexGrow justifyContent="center" className={classes.leftLayout}>
        <AppLogo color="inherit" style={{ width: 96, height: 96 }} />
        <Typography variant="h4" style={{ marginTop: 32 }}>Welcome to</Typography>
        <Typography variant="h2" style={{ marginTop: 16 }}>Cashflow</Typography>
      </View>
      <View justifyContent="center" className={classes.rightLayout}>
        <Formik
          initialValues={{ ...initialValues }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setError('');
            try {
              const success = await AuthService.login(values);
              if (success) {
                setIsAuthenticated(true);
              } else {
                setError('Invalid username or password');
              }
            } catch {
              setError('Invalid username or password');
            }
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
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <View alignItems="center">
                  <AppLogo color="primary" style={{ width: 64, height: 64 }} />
                </View>
                <View style={{ marginTop: 64 }}>
                  <TextField
                    autoFocus
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Username"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.username && errors.username}
                    error={touched.username && Boolean(errors.username)}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Password"
                    type="password"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.password && errors.password}
                    error={touched.password && Boolean(errors.password)}
                  />
                </View>
                {Boolean(error) && <Typography color="error" style={{ marginTop: 16 }}>Invalid username or password</Typography>}
                <View style={{ marginTop: 32 }}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    size="large"
                    disabled={(submitCount && !isValid) || isSubmitting}
                  >
                    Login
                  </Button>
                </View>
              </form>
            )}
        </Formik>
      </View>
    </View>
  );
};

export default Login;
