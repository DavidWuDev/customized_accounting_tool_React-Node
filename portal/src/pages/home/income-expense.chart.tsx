import Config from '@app/config';
import { errorHandler } from '@app/helpers/common.helper';
import { formatCurrency } from '@app/helpers/locale.helper';
import { NetworkService } from '@app/services';
import Moment from 'moment-timezone';
import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import DashboadCard from './dashboard-card.component';

interface IProps {
  person?: string;
}

interface IState {
  data: any[];
  loading: boolean;
}

class IncomeExpenseChart extends Component<IProps, IState> {
  state: IState = {
    data: [],
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
      const data = await NetworkService.get(`${Config.SERVER_URL}/reports/income-expense?person=${person}`);

      this.setState({
        data,
        loading: false,
      });
    } catch(error) {
      errorHandler(error);
    }
  }

  render() {
    const data = [
      ['Month', 'Income', 'Expense'],
      ...this.state.data.map(x => {
        return [
          Moment(x._id).format('MMM'),
          { v: x.income, f: formatCurrency(Math.abs(x.income)) },
          { v: x.expense, f: formatCurrency(Math.abs(x.expense)) },
        ];
      }),
    ];
    return (
      <DashboadCard title="Income/Expense" loading={this.state.loading}>
        <Chart
          width="100%"
          height="100%"
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={data}
          options={{
            chartArea: {
              top: 30,
              left: 50,
              right: 20,
              bottom: 50,
            },
            legend: { position: 'top' },
            isStacked: true,
            vAxis: {
              format: 'short',
            },
          }}
        />
      </DashboadCard>
    );
  }
}

export default IncomeExpenseChart;
