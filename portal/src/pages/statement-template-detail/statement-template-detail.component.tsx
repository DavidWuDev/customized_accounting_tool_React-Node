import { StatementTemplateService } from '@app/services';
import { IBank, IStatementTemplate } from '@app/types';
import { Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/BusinessOutlined';
import CodeIcon from '@material-ui/icons/CodeOutlined';
import ExtensionIcon from '@material-ui/icons/ExtensionOutlined';
import TemplateIcon from '@material-ui/icons/FormatPaintOutlined';
import React from 'react';
import { Link } from 'react-router-dom';
import DataDetail from '../data-detail/data-detail.component';

const StatementTemplateDetail = () => {
  return (
    <DataDetail
      name="statement-template"
      title="Statement template"
      service={StatementTemplateService}
      populate="bank"
      renderRecord={(record: IStatementTemplate) => (
        <Grid container style={{ paddingTop: 8, paddingBottom: 8 }}>
          <Grid item xs={12} md={12}>
            <List disablePadding>
              <ListItem button component={Link} to={`/bank/${(record.bank as IBank)._id}`}>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Bank"
                  secondary={(record.bank as IBank).name}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TemplateIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Name"
                  secondary={record.name}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Code"
                  secondary={record.code}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ExtensionIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Extension"
                  secondary={record.extension}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      )}
    />
  );
};

export default StatementTemplateDetail;
