import { View } from '@app/components';
import Config from '@app/config';
import { errorHandler, getFullName } from '@app/helpers/common.helper';
import { formatCurrency } from '@app/helpers/locale.helper';
import { NetworkService } from '@app/services';
import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/PersonOutline';
import React, { Component } from 'react';
import DashboadCard from './dashboard-card.component';
import IncomeTaxDetail from './income-tax-detail.component';

interface IProps {
  person?: string;
}

interface IState {
  data: any[];
  loading: boolean;
  detail: any;
}

class IncomeTax extends Component<IProps, IState> {
  state: IState = {
    data: [],
    loading: true,
    detail: null,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.person !== prevProps.person) {
      this.loadData();
    }
  }

  async loadData() {
    const { person } = this.props;
    this.setState({
      loading: true,
    });

    try {
      const data = await NetworkService.get(`${Config.SERVER_URL}/reports/income-tax?person=${person}`);

      this.setState({
        data,
        loading: false,
      });
    } catch(error) {
      errorHandler(error);
    }
  }

  render() {

    return (
      <DashboadCard title="Income tax" loading={this.state.loading}>
        <View flexGrow style={{ height: '100%' }}>
          <List>
            {this.state.data.map((item, index) => (
              <ListItem key={String(index)} button onClick={() => this.setState({ detail: item })}>
                <ListItemAvatar>
                  <PersonIcon />
                </ListItemAvatar>
                <ListItemText
                  primary={getFullName(item.person.firstName, item.person.lastName)}
                  secondary={formatCurrency(item.totalTax)}
                />
              </ListItem>
            ))}
          </List>
        </View>
        <IncomeTaxDetail
          detail={this.state.detail}
          onClose={() => this.setState({ detail: null })}
        />
      </DashboadCard>
    );
  }
}

export default IncomeTax;
