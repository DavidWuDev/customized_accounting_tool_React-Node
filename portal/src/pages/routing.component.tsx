import * as React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import PrivateRoute from './private-route.component';

// pages
import history from '../helpers/history.helper';
import BankAccountDetail from './bank-account-detail';
import BankAccounts from './bank-accounts';
import BankDetail from './bank-detail';
import Banks from './banks';
import Categories from './categories';
import CreateEditBank from './create-edit-bank';
import CreateEditBankAccount from './create-edit-bank-account';
import CreateEditCategory from './create-edit-category';
import CreateEditPerson from './create-edit-person';
import CreateEditRule from './create-edit-rule';
import CreateEditStatementTemplate from './create-edit-statement-template';
import CreateEditTransaction from './create-edit-transaction';
import HomePage from './home';
import ImportStatementPage from './import-statement';
import LoginPage from './login';
import NotFoundPage from './not-found';
import PersonDetail from './person-detail';
import Persons from './persons';
import Rules from './rules';
import StatementTemplateDetail from './statement-template-detail';
import StatementTemplates from './statement-templates';
import TransactionDetail from './transaction-detail';
import Transactions from './transactions';

const Routing: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path="/import-statement" component={ImportStatementPage} />
        <PrivateRoute exact path="/persons" component={Persons} />
        <PrivateRoute exact path="/person/add" component={CreateEditPerson} />
        <PrivateRoute exact path="/person/edit/:id" component={CreateEditPerson} />
        <PrivateRoute exact path="/person/:id" component={PersonDetail} />
        <PrivateRoute exact path="/banks" component={Banks} />
        <PrivateRoute exact path="/bank/add" component={CreateEditBank} />
        <PrivateRoute exact path="/bank/edit/:id" component={CreateEditBank} />
        <PrivateRoute exact path="/bank/:id" component={BankDetail} />
        <PrivateRoute exact path="/bank-accounts" component={BankAccounts} />
        <PrivateRoute exact path="/bank-account/add" component={CreateEditBankAccount} />
        <PrivateRoute exact path="/bank-account/edit/:id" component={CreateEditBankAccount} />
        <PrivateRoute exact path="/bank-account/:id" component={BankAccountDetail} />
        <PrivateRoute exact path="/statement-templates" component={StatementTemplates} />
        <PrivateRoute exact path="/statement-template/add" component={CreateEditStatementTemplate} />
        <PrivateRoute exact path="/statement-template/edit/:id" component={CreateEditStatementTemplate} />
        <PrivateRoute exact path="/statement-template/:id" component={StatementTemplateDetail} />
        <PrivateRoute exact path="/transactions" component={Transactions} />
        <PrivateRoute exact path="/transaction/add" component={CreateEditTransaction} />
        <PrivateRoute exact path="/transaction/edit/:id" component={CreateEditTransaction} />
        <PrivateRoute exact path="/transaction/:id" component={TransactionDetail} />
        <PrivateRoute exact path="/categories" component={Categories} />
        <PrivateRoute exact path="/category/add" component={CreateEditCategory} />
        <PrivateRoute exact path="/category/edit/:id" component={CreateEditCategory} />
        <PrivateRoute exact path="/rules" component={Rules} />
        <PrivateRoute exact path="/rule/add" component={CreateEditRule} />
        <PrivateRoute exact path="/rule/edit/:id" component={CreateEditRule} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default Routing;
