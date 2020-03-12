import { formatCurrency } from '@app/helpers/locale.helper';
import { TransactionService } from '@app/services';
import { IBankAccount, ICategory, ITransaction } from '@app/types';
import { Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import BankAccountIcon from '@material-ui/icons/AccountBalanceOutlined';
import MoneyIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import CategoryIcon from '@material-ui/icons/CategoryOutlined';
import DateIcon from '@material-ui/icons/DateRangeOutlined';
import NoteIcon from '@material-ui/icons/SpeakerNotesOutlined';
import Moment from 'moment-timezone';
import React from 'react';
import { Link } from 'react-router-dom';
import DataDetail from '../data-detail/data-detail.component';

const TransactionDetail = () => {
  return (
    <DataDetail
      name="transaction"
      title="Transaction"
      service={TransactionService}
      populate="bankAccount category"
      allowEdit={(item: ITransaction) => item.isPostDated}
      allowDelete
      renderRecord={(record: ITransaction) => (
        <Grid container style={{ paddingTop: 8, paddingBottom: 8 }}>
          <Grid item xs={12} md={12}>
            <List disablePadding>
              <ListItem button component={Link} to={`/bank-account/${(record.bankAccount as IBankAccount)._id}`}>
                <ListItemIcon>
                  <BankAccountIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Bank account"
                  secondary={(record.bankAccount as IBankAccount).bankAccountAliasName}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DateIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Transaction date"
                  secondary={Moment(record.transactionDate).format('DD MMM YYYY')}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DateIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Value date"
                  secondary={Moment(record.valueDate).format('DD MMM YYYY')}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NoteIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Narration"
                  secondary={record.narration}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NoteIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Reference"
                  secondary={record.reference}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MoneyIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Amount"
                  secondary={`${formatCurrency(Math.abs(record.amount))} ${record.amount > 0 ? 'CR' : 'DR'}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Category"
                  secondary={record.category ? (record.category as ICategory).name : '-'}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DateIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Post dated"
                  secondary={record.isPostDated ? 'Yes' : 'No'}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      )}
    />
  );
};

export default TransactionDetail;
