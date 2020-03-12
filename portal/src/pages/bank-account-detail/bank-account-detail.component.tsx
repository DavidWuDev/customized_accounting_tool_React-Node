import { formatCurrency } from '@app/helpers/locale.helper';
import { BankAccountService } from '@app/services';
import { IBankAccount } from '@app/types';
import { Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import IFSCIcon from '@material-ui/icons/AssignmentLateOutlined';
import BusinessIcon from '@material-ui/icons/BusinessOutlined';
import AccountNumberIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import BranchIcon from '@material-ui/icons/DeviceHubOutlined';
import PersonIcon from '@material-ui/icons/PersonOutline';
import React from 'react';
import { Link } from 'react-router-dom';
import DataDetail from '../data-detail/data-detail.component';

const BankAccountDetail = () => {
  return (
    <DataDetail
      name="bank-account"
      title="Bank account"
      service={BankAccountService}
      renderRecord={(record: IBankAccount) => (
        <Grid container style={{ paddingTop: 8, paddingBottom: 8 }}>
          <Grid item xs={12} md={12}>
            <List disablePadding>
              <ListItem button component={Link} to={`/person/${record.accountHolder}`}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Account holder"
                  secondary={record.accountName}
                />
              </ListItem>
              <ListItem button component={Link} to={`/bank/${record.bank}`}>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Bank"
                  secondary={record.bankAccountAliasName}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccountNumberIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Account number"
                  secondary={record.accountNumber}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BranchIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Branch"
                  secondary={record.branch}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <IFSCIcon />
                </ListItemIcon>
                <ListItemText
                  primary="IFSC"
                  secondary={record.ifsc}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Opening balance"
                  secondary={formatCurrency(record.openingBalance)}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      )}
    />
  );
};

export default BankAccountDetail;
