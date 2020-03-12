import { ActionFooter, ScrollView, View } from '@app/components';
import { errorHandler } from '@app/helpers/common.helper';
import { BankAccountService, PersonService, StatementTemplateService } from '@app/services';
import { IBankAccount, IPerson, IStatementTemplate } from '@app/types';
import { MenuItem, TextField } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { IAccountInfo } from './import-statement.types';

const initialValues = {
  person: '',
  bankAccount: '',
  template: '',
};

const validationSchema = yup.object().shape({
  person: yup.string().required(),
  bankAccount: yup.string().required(),
  template: yup.string().required(),
});

interface IProps {
  accountInfo: IAccountInfo;
  onSubmit: (accountInfo: IAccountInfo) => void;
}

interface IState {
  persons: IPerson[];
  accounts: IBankAccount[];
  templates: IStatementTemplate[];
}

class StepSelectAccount extends React.Component<IProps, IState> {
  state: IState = {
    persons: [],
    accounts: [],
    templates: [],
  };

  componentDidMount() {
    this.loadPersons();

    if (this.props.accountInfo) {
      this.initLoadAll(this.props.accountInfo);
    }
  }

  setPersons(persons: IPerson[]) {
    this.setState({
      persons,
    });
  }

  setAccounts(accounts: IBankAccount[]) {
    this.setState({
      accounts,
    });
  }

  setTemplates(templates: IStatementTemplate[]) {
    this.setState({
      templates,
    });
  }

  loadPersons = async () => {
    try {
      const persons = await PersonService.getList();
      this.setPersons(persons);
    } catch (error) {
      errorHandler(error);
    }
  }

  loadAccounts = async (personId: string) => {
    try {
      this.setAccounts([]);
      const accounts = await BankAccountService.getList({ query: { accountHolder: personId } });
      this.setAccounts(accounts);
    } catch (error) {
      errorHandler(error);
    }
  }

  loadTemplates = async (bankId: string) => {
    try {
      this.setTemplates([]);
      const templates = await StatementTemplateService.getList({ query: { bank: bankId } });
      this.setTemplates(templates);
    } catch (error) {
      errorHandler(error);
    }
  }

  initLoadAll = async (accountInfo: IAccountInfo) => {
    try {
      const accounts = await BankAccountService.getList({ query: { accountHolder: accountInfo.person._id } });
      this.setAccounts(accounts);
      const templates = await StatementTemplateService.getList({ query: { bank: accountInfo.bankAccount.bank as string } });
      this.setTemplates(templates);
    } catch (error) {
      errorHandler(error);
    }
  }

  render() {
    const { persons, accounts, templates } = this.state;
    const props = this.props;
    const initFormValue = {
      ...initialValues,
    };

    if (props.accountInfo) {
      initFormValue.person = props.accountInfo.person._id;
      initFormValue.bankAccount = props.accountInfo.bankAccount._id;
      initFormValue.template = props.accountInfo.template._id;
    }

    return (
      <Formik
        initialValues={initFormValue}
        validationSchema={validationSchema}
        isInitialValid={props.accountInfo ? true : false}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);

          const person = persons.find(x => x._id === values.person);
          const bankAccount = accounts.find(x => x._id === values.bankAccount);
          const template = templates.find(x => x._id === values.template);

          props.onSubmit({
            person,
            bankAccount,
            template,
          });
        }}
      >
        {({
          handleSubmit,
          values,
          handleChange,
          setFieldValue,
          isValid,
        }) => (
            <form noValidate autoComplete="off" style={{ display: 'flex', flex: 1, overflow: 'hidden' }} onSubmit={handleSubmit}>
              <View flexGrow>
                <ScrollView>
                  <View flexGrow flexDirection="column" justifyContent="center" style={{ minWidth: 360, maxWidth: 360, margin: '0px auto' }}>
                    <TextField
                      select
                      label="Person"
                      name="person"
                      value={values.person}
                      onChange={(e) => {
                        setFieldValue('person', e.target.value);
                        this.loadAccounts(e.target.value);
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                      variant="outlined"
                    >
                      {persons.map(person => (
                        <MenuItem key={person._id} value={person._id}>
                          {person.fullName}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      select
                      label="Account"
                      name="bankAccount"
                      value={values.bankAccount}
                      onChange={(e) => {
                        setFieldValue('bankAccount', e.target.value);
                        this.loadTemplates(accounts.find(x => x._id === e.target.value).bank as string);
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                      variant="outlined"
                      disabled={!Boolean(accounts.length)}
                    >
                      {accounts.map(account => (
                        <MenuItem key={account._id} value={account._id}>
                          {account.bankAccountAliasName}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      select
                      label="Template"
                      name="template"
                      value={values.template}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                      variant="outlined"
                      disabled={!Boolean(templates.length)}
                    >
                      {templates.map(template => (
                        <MenuItem key={template._id} value={template._id}>
                          {template.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </View>
                </ScrollView>
                <ActionFooter>
                  <View flexGrow />
                  <View flexDirection="row">
                    <ActionFooter.ActionButton variant="outlined" color="primary" type="submit" disabled={!isValid}>
                      Continue&nbsp;
                      <ArrowForwardIcon />
                    </ActionFooter.ActionButton>
                  </View>
                </ActionFooter>
              </View>
            </form>
          )}
      </Formik>
    );
  }
}

export default StepSelectAccount;
