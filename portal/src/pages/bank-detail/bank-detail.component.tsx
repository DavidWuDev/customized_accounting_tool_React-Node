import { BankService } from '@app/services';
import { IBank } from '@app/types';
import { Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/BusinessOutlined';
import React from 'react';
import DataDetail from '../data-detail/data-detail.component';

const BankDetail = () => {
  return (
    <DataDetail
      name="bank"
      title="Bank"
      service={BankService}
      renderRecord={(record: IBank) => (
        <Grid container style={{ paddingTop: 8, paddingBottom: 8 }}>
          <Grid item xs={12} md={12}>
            <List disablePadding>
              <ListItem>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Name"
                  secondary={record.name}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Alias name"
                  secondary={record.aliasName}
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
