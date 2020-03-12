import { Header, View } from '@app/components';
import { errorHandler, showSnackbar } from '@app/helpers/common.helper';
import history from '@app/helpers/history.helper';
import { IData, IDataService } from '@app/types';
import { CircularProgress, Typography } from '@material-ui/core';
import NotFoundIcon from '@material-ui/icons/BrokenImageOutlined';
import React from 'react';
import { RouteChildrenProps, withRouter } from 'react-router';

interface IProps<T extends IData, P> {
  name: string;
  pluralName?: string;
  title: string;
  service: IDataService<T, P>;
  renderForm: (record: T, onSubmit: (record: T) => Promise<void>) => React.ReactElement;
}

interface IRouteParams {
  id: string;
}

interface IState<T> {
  record: T;
  loading: boolean;
  invalid: boolean;
}

class CreateEditData<T extends IData, P> extends React.Component<IProps<T, P> & RouteChildrenProps<IRouteParams>, IState<T>> {
  state: IState<T> = {
    record: null,
    loading: true,
    invalid: false,
  };

  async componentDidMount() {
    const service = this.props.service;
    const id = this.props.match.params.id;

    if (id) {
      try {
        const record = await service.get(this.props.match.params.id);
        this.setState({
          record,
          loading: false,
        });
      } catch {
        this.setState({
          loading: false,
          invalid: true,
        });
      }
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  handleSave = async (record: T) => {
    try {
      const result = await this.props.service.save(record);

      const pluralName = this.props.pluralName || this.props.name + 's';

      const editUrl = `/${this.props.name}/edit/${result._id}`;

      showSnackbar({
        type: 'success',
        message: `${this.props.title} "${result.name}" saved.`,
        action: {
          title: 'Edit',
          onClick: () => history.push(editUrl),
        },
      });

      this.props.history.push(`/${pluralName}`);
    } catch (error) {
      errorHandler(error);
    }
  }

  renderHeader() {
    const id = this.props.match.params.id;

    return (
      <Header title={`${id ? 'Edit' : 'Add'} ${this.props.title.toLowerCase()}`} leftComponent={<Header.BackButton />} />
    );
  }

  renderLoading() {
    return (
      <View flexGrow alignItems="center" justifyContent="center">
        <CircularProgress />
      </View>
    );
  }

  renderNotFound() {
    return (
      <View flexGrow alignItems="center" justifyContent="center">
        <Typography color="textSecondary" variant="h1">
          <NotFoundIcon fontSize="inherit" />
        </Typography>
        <Typography color="textSecondary" variant="h5">
          Record not found
        </Typography>
      </View>
    );
  }

  render() {
    const { loading, invalid, record } = this.state;

    return (
      <View flexGrow>
        {this.renderHeader()}
        {loading && this.renderLoading()}
        {!loading && invalid && this.renderNotFound()}
        {!loading && !invalid && this.props.renderForm(record, this.handleSave)}
      </View>
    );
  }
}

export default withRouter(CreateEditData);
