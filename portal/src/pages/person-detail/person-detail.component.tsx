import { formatCurrency } from '@app/helpers/locale.helper';
import { PersonService } from '@app/services';
import { IPerson } from '@app/types';
import { Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import PancardIcon from '@material-ui/icons/CreditCardOutlined';
import PersonIcon from '@material-ui/icons/PersonOutline';
import React from 'react';
import DataDetail from '../data-detail/data-detail.component';

const BankDetail = () => {
  return (
    <DataDetail
      name="person"
      title="Person"
      service={PersonService}
      renderRecord={(record: IPerson) => (
        <Grid container style={{ paddingTop: 8, paddingBottom: 8 }}>
          <Grid item xs={12} md={12}>
            <List disablePadding>
            <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Name"
                  secondary={record.fullName}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PancardIcon />
                </ListItemIcon>
                <ListItemText
                  primary="PAN"
                  secondary={record.pan}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Monthly income"
                  secondary={formatCurrency(record.monthlyIncome)}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      )}
    />
  );
};

export default BankDetail;
