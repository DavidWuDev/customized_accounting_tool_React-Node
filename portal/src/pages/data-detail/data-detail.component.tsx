import { Header, View } from '@app/components';
import { IData, IDataService } from '@app/types';
import { CircularProgress, Tooltip, Typography, Zoom } from '@material-ui/core';
import NotFoundIcon from '@material-ui/icons/BrokenImageOutlined';
import EditIcon from '@material-ui/icons/CreateOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import React, { Component } from 'react';
import { RouteChildrenProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import DeleteConfirmDialog from '../data-view/delete-confirm-dialog.component';

interface IProps<T extends IData, P> {
  name: string;
  pluralName?: string;
  title: string;
  service: IDataService<T, P>;
  populate?: P;
  allowEdit?: boolean | ((item: T) => boolean);
  allowDelete?: boolean | ((item: T) => boolean);
  renderRecord: (item: T) => React.ReactElement;
}

interface IRouteParams {
  id: string;
}

interface IState<T> {
  record: T;
  loading: boolean;
  showDelete: boolean;
  deleting: boolean;
}

class DataDetail<T extends IData, P> extends Component<IProps<T, P> & RouteChildrenProps<IRouteParams>, IState<T>> {
  static defaultProps = {
    allowEdit: true,
  };

  state: IState<T> = {
    record: null,
    loading: true,
    showDelete: false,
    deleting: false,
  };

  async componentDidMount() {
    const { service } = this.props;
    try {
      const record = await service.get(this.props.match.params.id, this.props.populate);
      this.setState({
        record,
        loading: false,
      });
    } catch {
      this.setState({
        loading: false,
      });
    }
  }

  checkAllowEdit = (record: T) => {
    const { allowEdit } = this.props;

    if (!record || !allowEdit) {
      return false;
    }

    return typeof allowEdit === 'boolean' ? allowEdit : allowEdit(record);
  }

  checkAllowDelete = (record: T) => {
    const { allowDelete } = this.props;

    if (!record || !allowDelete) {
      return false;
    }

    return typeof allowDelete === 'boolean' ? allowDelete : allowDelete(record);
  }

  handleOpenDelete = () => {
    this.setState({
      showDelete: true,
    });
  }

  handleCloseDelete = () => {
    this.setState({
      showDelete: false,
    });
  }

  handleDeleteConfirm = async () => {
    this.setState({
      deleting: true,
    });

    try {
      await this.props.service.delete(this.state.record._id);
      this.setState({
        deleting: false,
        showDelete: false,
      });

      this.props.history.replace(this.props.pluralName ? `/${this.props.pluralName}` : `/${this.props.name}s`);
    } catch {
      this.setState({
        deleting: false,
      });
    }
  }

  renderHeader() {
    const { id } = this.props.match.params;
    const { record } = this.state;
    const { name, title } = this.props;

    return (
      <Header
        title={`${title} detail`}
        leftComponent={<Header.BackButton />}
        rightComponent={(
          <View flexDirection="row">
            <Zoom in={this.checkAllowEdit(record)} mountOnEnter unmountOnExit>
              <Link to={`/${name}/edit/${id}`} style={{ color: 'inherit' }}>
                <Header.IconButton>
                  <Tooltip title="Edit">
                    <EditIcon />
                  </Tooltip>
                </Header.IconButton>
              </Link>
            </Zoom>
            <Zoom in={this.checkAllowDelete(record)} mountOnEnter unmountOnExit>
              <View>
                <Header.IconButton onClick={this.handleOpenDelete}>
                  <Tooltip title="Delete">
                    <DeleteIcon />
                  </Tooltip>
                </Header.IconButton>
              </View>
            </Zoom>
          </View>
        )}
      />
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
    const { loading, record } = this.state;
    return (
      <View flexGrow>
        {this.renderHeader()}
        {loading && this.renderLoading()}
        {!loading && !Boolean(record) && this.renderNotFound()}
        {!loading && Boolean(record) && this.props.renderRecord(record)}
        <DeleteConfirmDialog
          open={this.state.showDelete}
          deleting={this.state.deleting}
          onClose={this.handleCloseDelete}
          onConfirm={this.handleDeleteConfirm}
        />
      </View>
    );
  }
}

export default withRouter(DataDetail);
