import { View } from '@app/components';
import Config from '@app/config';
import { errorHandler } from '@app/helpers/common.helper';
import { NetworkService } from '@app/services';
import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/CategoryOutlined';
import RepeatIcon from '@material-ui/icons/RepeatOutlined';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DashboadCard from './dashboard-card.component';

interface IProps {
  person?: string;
}

interface IState {
  data: any;
  loading: boolean;
}

class DataStatistics extends Component<IProps, IState> {
  state: IState = {
    data: null,
    loading: true,
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
      const data = await NetworkService.get(`${Config.SERVER_URL}/reports/data-statistics?person=${person}`);

      this.setState({
        data,
        loading: false,
      });
    } catch(error) {
      errorHandler(error);
    }
  }

  render() {
    const { data, loading } = this.state;
    return (
      <DashboadCard title="Data statistics" loading={this.state.loading}>
        {!loading && (
          <View flexGrow style={{ height: '100%' }}>
            <List>
              <ListItem
                button
                component={Link}
                to={`/transactions?category=null`}
              >
                <ListItemAvatar>
                  <CategoryIcon />
                </ListItemAvatar>
                <ListItemText
                  primary="Transaction without category"
                  secondary={data.emptyCategory}
                />
              </ListItem>
              <ListItem button>
                <ListItemAvatar>
                  <RepeatIcon />
                </ListItemAvatar>
                <ListItemText
                  primary="Duplicate transactions"
                  secondary={data.duplicateRecords}
                />
              </ListItem>
            </List>
          </View>
        )}
      </DashboadCard>
    );
  }
}

export default DataStatistics;
