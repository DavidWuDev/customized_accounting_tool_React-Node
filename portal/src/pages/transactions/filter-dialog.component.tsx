import { ActionFooter, DataLookup, ScrollView, View } from '@app/components';
import { BankAccountService, CategoryService } from '@app/services';
import MomentUtils from '@date-io/moment';
import { Button, Drawer, Grid, IconButton, makeStyles, Paper, TextField, Theme, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import classNames from 'classnames';
import { Formik } from 'formik';
import React from 'react';
import { IFilter } from './transactions.types';

const DRAWER_WIDTH = 400;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    overflowX: 'hidden',
    width: DRAWER_WIDTH,
    [theme.breakpoints.down('xs')]: {
      width: '100vw',
    },
  },
  drawerHeader: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    // boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  },
  drawerHeaderTitle: {
    color: theme.palette.text.secondary,
    flex: 1,
  },
  gridItem: {
    paddingTop: '4px !important',
    paddingBottom: '0px !important',
  },
}));

interface IProps {
  open: boolean;
  onClose: () => void;
  onApply: (values: IFilter) => void;
  initialValue: IFilter;
}

const FilterDialog: React.FC<IProps> = (props) => {
  const classes = useStyles(props);

  return (
    <Drawer
      open={props.open}
      onBackdropClick={props.onClose}
      anchor="right"
      classes={{
        paper: classNames(classes.drawerPaper),
      }}
    >
      <div className={classes.root}>
        <Paper className={classNames(classes.toolbar, classes.drawerHeader)} elevation={4} square>
          <Typography variant="h6" className={classes.drawerHeaderTitle}>
            Filter
          </Typography>
          <IconButton style={{ marginRight: 8 }} onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </Paper>
      </div>
      {/* <Divider /> */}
      <View flexGrow>
        <Formik
          initialValues={props.initialValue}
          onSubmit={(values) => props.onApply(values)}
        >
          {({
            submitForm,
            values,
            handleChange,
            setFieldValue,
          }) => {
            return (
              <React.Fragment>
                <ScrollView style={{ padding: 16 }}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} className={classes.gridItem}>
                        <TextField
                          fullWidth
                          label="Search"
                          variant="outlined"
                          margin="normal"
                          InputLabelProps={{ shrink: true }}
                          name="search"
                          value={values.search}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.gridItem}>
                        <DataLookup
                          fullWidth
                          service={BankAccountService}
                          label="Bank account"
                          variant="outlined"
                          margin="normal"
                          InputLabelProps={{ shrink: true }}
                          predata={[{
                            _id: '',
                            name: '',
                          } as any]}
                          name="bankAccount"
                          value={values.bankAccount}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.gridItem}>
                        <DataLookup
                          fullWidth
                          service={CategoryService}
                          label="Category"
                          variant="outlined"
                          margin="normal"
                          InputLabelProps={{ shrink: true }}
                          predata={[{
                            _id: '',
                            name: '',
                          }, {
                            _id: 'null',
                            name: 'Blank category',
                          }]}
                          name="category"
                          value={values.category}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.gridItem}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Minimum amount"
                          variant="outlined"
                          margin="normal"
                          InputLabelProps={{ shrink: true }}
                          name="minAmount"
                          value={values.minAmount}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.gridItem}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Maximum amount"
                          variant="outlined"
                          margin="normal"
                          InputLabelProps={{ shrink: true }}
                          name="maxAmount"
                          value={values.maxAmount}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.gridItem}>
                        <KeyboardDatePicker
                          fullWidth
                          autoOk
                          disableToolbar
                          inputVariant="outlined"
                          variant="inline"
                          format="DD-MM-YYYY"
                          margin="normal"
                          label="Start date"
                          InputLabelProps={{ shrink: true }}
                          value={values.startDate}
                          onChange={(date) => setFieldValue('startDate', date ? date.toDate() : null)}
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.gridItem}>
                        <KeyboardDatePicker
                          fullWidth
                          autoOk
                          disableToolbar
                          inputVariant="outlined"
                          variant="inline"
                          format="DD-MM-YYYY"
                          margin="normal"
                          label="End date"
                          InputLabelProps={{ shrink: true }}
                          value={values.endDate}
                          onChange={(date) => setFieldValue('endDate', date ? date.toDate() : null)}
                        />
                      </Grid>
                    </Grid>
                  </MuiPickersUtilsProvider>
                </ScrollView>
                <ActionFooter>
                  <Button color="primary" variant="outlined" onClick={() => submitForm()}>
                    Apply
                  </Button>
                </ActionFooter>
              </React.Fragment>
            );
          }}
        </Formik>
      </View>
    </Drawer>
  );
};

export default FilterDialog;
