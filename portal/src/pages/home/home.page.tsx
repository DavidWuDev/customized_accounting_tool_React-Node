import { DataLookup, Header, ScrollView, View } from '@app/components';
import { PersonService } from '@app/services';
import { Card, Collapse, Grid } from '@material-ui/core';
import FilterIcon from '@material-ui/icons/FilterListOutlined';
import React, { Component } from 'react';
import BalanceChart from './balance.chart';
import DataStatistics from './data-statistics.component';
import ExpenseByCategoryChart from './expense-category.chart';
import IncomeByCategoryChart from './income-category.chart';
import IncomeExpenseChart from './income-expense.chart';
import IncomeTaxComponent from './income-tax.component';

interface IState {
  person: string;
  visibleFilter: boolean;
}

class HomePage extends Component<{}, IState> {
  state: IState = {
    person: '',
    visibleFilter: false,
  };

  handleChangePerson = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      person: e.target.value && e.target.value !== '-' ? e.target.value : '',
    });
  }

  handleToggleFilter = () => {
    this.setState({
      visibleFilter: !this.state.visibleFilter,
    });
  }

  render() {
    return (
      <View flexGrow style={{ background: '#f8f8f8' }}>
        <Header
          title="Cashflow"
          drawerMenu
          rightComponent={(
            <View flexDirection="row">
              <Header.IconButton onClick={this.handleToggleFilter}><FilterIcon /></Header.IconButton>
            </View>
          )}
        />
        <Collapse in={this.state.visibleFilter}>
          <Card style={{ borderRadius: 0 }}>
            <View flexDirection="row" justifyContent="end" style={{ paddingTop: 16, paddingLeft: 24, paddingRight: 24, paddingBottom: 16 }}>
              <DataLookup
                fullWidth
                style={{ maxWidth: 260 }}
                label="Person"
                InputLabelProps={{
                  shrink: true,
                }}
                service={PersonService}
                variant="outlined"
                predata={[{ _id: '-', name: 'All' }]}
                value={this.state.person || '-'}
                onChange={this.handleChangePerson}
              />
            </View>
          </Card>
        </Collapse>
        <ScrollView>
          <div style={{ padding: 24 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={6}>
                <IncomeExpenseChart person={this.state.person} />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <BalanceChart person={this.state.person} />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <IncomeByCategoryChart person={this.state.person} />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <ExpenseByCategoryChart person={this.state.person} />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <IncomeTaxComponent person={this.state.person} />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <DataStatistics person={this.state.person} />
              </Grid>
            </Grid>
          </div>
        </ScrollView>
      </View>
    );
  }
}

export default HomePage;
