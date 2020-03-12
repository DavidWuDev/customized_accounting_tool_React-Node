import { errorHandler } from '@app/helpers/common.helper';
import { IData, IDataService } from '@app/types';
import { MenuItem, TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import React, { Component } from 'react';

interface IProps {
  service: IDataService<IData, any>;
  predata?: IData[];
}

interface IState {
  data: IData[];
}

class DataLookup extends Component<TextFieldProps & IProps, IState> {
  state: IState = {
    data: [],
  };

  async componentDidMount() {
    try {
      const data = await this.props.service.lookup();
      data.sort((a, b) => a > b ? 1 : a < b ? -1 : 0);
      this.setState({
        data,
      });
    } catch (error) {
      errorHandler(error);
    }
  }

  render() {
    const { service, ...rest } = this.props;
    const data = [...(this.props.predata || []), ...this.state.data];
    return (
      <TextField
        select
        {...rest}
      >
        {data.map((item) => (
          <MenuItem key={String(item._id)} value={item._id}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}

export default DataLookup;
