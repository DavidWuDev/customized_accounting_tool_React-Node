import { ScrollView, View } from '@app/components';
import { ContentLoader } from '@app/components';
import { errorHandler, showSnackbar } from '@app/helpers/common.helper';
import { IData } from '@app/types';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { StyleRules, withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { RouteChildrenProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import DataRow from './data-row.component';
import DataViewHeader from './data-view-header.component';
import { IDataViewProps } from './data-view.types';
import DeleteConfirmDialog from './delete-confirm-dialog.component';
import MoreActions from './more-actions.component';

type ViewClassKey = 'root';

const styles: StyleRules<any, ViewClassKey> = {
  root: {},
};

interface IState<T> {
  data: T[];
  menuAnchor: null | HTMLElement;
  selectedItem: T;
  showConfirmDelete: boolean;
  deleting: boolean;
  loading: boolean;
}

interface IStyleProps {
  classes: {
    [key in ViewClassKey]: string;
  };
}

class DataView<T extends IData, P> extends Component<IDataViewProps<T, P> & IStyleProps & RouteChildrenProps, IState<T>> {
  state: IState<T> = {
    data: [],
    menuAnchor: null,
    selectedItem: null,
    showConfirmDelete: false,
    deleting: false,
    loading: true,
  };

  async componentDidMount() {
    await this.loadData();
  }

  loadData = async () => {
    try {
      let data = await this.props.service.getList({ populate: this.props.populate });

      if (this.props.dataTransformer) {
        data = data.map(x => this.props.dataTransformer(x));
      }

      this.setState({
        data,
        loading: false,
      });
    } catch (error) {
      errorHandler(error);
    }
  }

  handleCloseMenu = () => {
    this.setState({
      menuAnchor: null,
    });
  }

  handleOpenMenu = (item: T, event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({
      menuAnchor: event.currentTarget,
      selectedItem: item,
    });
  }

  handleLink = (url: string) => {
    this.props.history.push(url);
  }

  handleViewRecord = (item: T) => {
    const { name, allowView } = this.props;
    if (!allowView) {
      return;
    }

    this.handleLink(`/${name}/${item._id}`);
  }

  handleEditRecord = (item: T) => {
    const { name, allowEdit } = this.props;

    if (!allowEdit) {
      return;
    }

    this.handleLink(`/${name}/edit/${item._id}`);
  }

  handleCancelDelete = () => {
    this.setState({
      selectedItem: null,
      showConfirmDelete: false,
    });
  }

  handleConfirmDelete = async () => {
    this.setState({
      deleting: true,
    });

    try {
      const { selectedItem } = this.state;
      await this.props.service.delete(selectedItem._id);

      this.setState({
        deleting: false,
        selectedItem: null,
        showConfirmDelete: false,
      });

      showSnackbar({
        type: 'warning',
        message: `${this.props.title} "${selectedItem.name}" deleted.`,
      });

      this.loadData();
    } catch (error) {
      errorHandler(error);
      this.setState({
        deleting: false,
      });
    }
  }

  renderLoading() {
    const { columns, allowView, allowEdit, allowDelete } = this.props;
    let { showMoreActions } = this.props;
    showMoreActions = showMoreActions && (allowEdit || allowView || allowDelete);
    const showActions = allowEdit || showMoreActions;
    const loadingRows = [0, 1, 2];

    return (
      <TableBody>
        {loadingRows.map((l) => (
          <TableRow key={String(l)}>
            {columns.map((column, index) => (
              <TableCell key={String(index)} align={column.align}>
                <ContentLoader.TableCell />
              </TableCell>
            ))}
            {showActions && (
              <TableCell align="right" padding="none">
                &nbsp;
            </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    );
  }

  render() {
    const { name, title, pluralName, pluralTitle, columns, allowView, allowAdd, allowEdit, allowDelete } = this.props;
    let { showMoreActions } = this.props;
    const { data, loading } = this.state;

    showMoreActions = showMoreActions && (allowEdit || allowView || allowDelete);

    const showActions = allowEdit || showMoreActions;

    return (
      <View flexGrow>
        <DataViewHeader name={name} pluralName={pluralName} title={title} pluralTitle={pluralTitle} allowAdd={allowAdd} />
        <ScrollView>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={String(index)} align={column.align}>{column.title}</TableCell>
                ))}
                {showActions && (
                  <TableCell align="right" padding="none">
                    &nbsp;
                </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(item => (
                <DataRow
                  key={item._id}
                  allowEdit={allowEdit}
                  allowView={allowView}
                  columns={columns}
                  item={item}
                  showActions={showActions}
                  showMoreActions={showMoreActions}
                  onEdit={this.handleEditRecord}
                  onView={this.handleViewRecord}
                  onMoreAction={this.handleOpenMenu}
                />
              ))}
            </TableBody>
            {loading && this.renderLoading()}
          </Table>
        </ScrollView>
        {showMoreActions && (
          <MoreActions
            anchorEl={this.state.menuAnchor}
            allowView={allowView}
            allowEdit={allowEdit}
            allowDelete={allowDelete}
            onClose={this.handleCloseMenu}
            onView={() => this.handleViewRecord(this.state.selectedItem)}
            onEdit={() => this.handleEditRecord(this.state.selectedItem)}
            onDelete={() => this.setState({ showConfirmDelete: true })}
          />
        )}
        <DeleteConfirmDialog
          open={this.state.showConfirmDelete}
          onClose={this.handleCancelDelete}
          onConfirm={this.handleConfirmDelete}
          deleting={this.state.deleting}
        />
      </View>
    );
  }
}

export const DataViewStyled: any = withStyles(styles)(withRouter(DataView as any)) as any;

export default <T extends IData, P extends IData>(props: IDataViewProps<T, P>) => {
  return <DataViewStyled {...props} />;
};
