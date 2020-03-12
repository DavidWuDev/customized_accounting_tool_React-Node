import { ActionFooter, Header, ScrollView, View } from '@app/components';
import { errorHandler } from '@app/helpers/common.helper';
import { formatCurrency, formatDate } from '@app/helpers/locale.helper';
import { TransactionService } from '@app/services';
import { IBankAccount, ICategory, ITransaction } from '@app/types';
import { Checkbox, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddOutlined';
import CategoryIcon from '@material-ui/icons/CategoryOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/EditOutlined';
import FilterIcon from '@material-ui/icons/FilterListOutlined';
import RuleIcon from '@material-ui/icons/FlagOutlined';
import ViewIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import Moment from 'moment-timezone';
import QueryString from 'querystring';
import React, { Component } from 'react';
import { RouteChildrenProps } from 'react-router';
import DeleteConfirmDialog from '../data-view/delete-confirm-dialog.component';
import FilterDialog from './filter-dialog.component';
import MoreMenu from './more-menu.component';
import TablePagination from './table-pagination.component';
import { IFilter } from './transactions.types';
import UpdateCategoryModal from './update-category-modal.component';

interface IState {
  transactions: ITransaction[];
  loading: boolean;
  page: number;
  count: number;
  rowsPerPage: number;
  sort: string;
  sortDirection: 'asc' | 'desc';
  selected: string[];
  showUpdateCateogryDialog: boolean;
  showFilterDialog: boolean;
  filter: IFilter;
  showConfirmDelete: boolean;
  deleting: boolean;
}

class Transactions extends Component<RouteChildrenProps, IState> {
  state: IState = {
    transactions: [],
    loading: true,
    count: 0,
    page: 0,
    rowsPerPage: 10,
    sort: 'transactionDate',
    sortDirection: 'desc',
    selected: [],
    showUpdateCateogryDialog: false,
    showFilterDialog: false,
    filter: {
      search: '',
      category: '',
      startDate: null,
      endDate: null,
      minAmount: '',
      maxAmount: '',
    },
    showConfirmDelete: false,
    deleting: false,
  };

  constructor(props: RouteChildrenProps) {
    super(props);

    const query = QueryString.parse(this.props.location.search.slice(1));
    this.state.filter.search = query.search ? query.search as string : '';
    this.state.filter.category = query.category ? query.category as string : '';
    this.state.filter.bankAccount = query.bankAccount ? query.bankAccount as string : '';
    this.state.filter.startDate = query.startDate ? new Date(query.startDate as string) : null;
    this.state.filter.endDate = query.endDate ? new Date(query.endDate as string) : null;
  }

  async componentDidMount() {
    // console.log(this.props);
    await this.loadData();
  }

  updateLocation = () => {
    const pathname = this.props.location.pathname;
    // QueryString.parse(this.props.location.search);

    const { filter } = this.state;
    const queries = Object.keys(filter).filter(x => filter[x]).map(x => `${x}=${filter[x]}`).join('&');

    if (!queries) {
      this.props.history.replace(pathname);
    } else {
      this.props.history.replace(pathname + '?' + queries);
    }
  }

  getFilterQuery = (values: IFilter) => {
    const query: any = {};

    if (values.search) {
      query.narration = {
        $regex: values.search,
        $options: 'i',
      };
    }

    if (values.category) {
      if (values.category.toLowerCase() === 'null') {
        query.category = null;
      } else {
        query.category = values.category;
      }
    }

    if (values.bankAccount) {
      query.bankAccount = values.bankAccount;
    }

    if (values.minAmount !== '' && values.maxAmount !== '') {
      query.amount = {
        $gte: values.minAmount,
        $lte: values.maxAmount,
      };
    } else if (values.minAmount !== '') {
      query.amount = {
        $gte: values.minAmount,
      };
    } else if (values.maxAmount !== '') {
      query.amount = {
        $lte: values.maxAmount,
      };
    }

    if (values.startDate && values.endDate) {
      query.transactionDate = {
        $gte: Moment(values.startDate).startOf('day').toISOString(),
        $lte: Moment(values.endDate).startOf('day').toISOString(),
      };
    } else if (values.startDate) {
      query.transactionDate = { $gte: Moment(values.startDate).startOf('day').toISOString() };
    } else if (values.endDate) {
      query.transactionDate = { $lte: Moment(values.endDate).startOf('day').toISOString() };
    }

    return query;
  }

  loadData = async () => {
    try {
      this.setState({
        loading: true,
      });

      const count = await TransactionService.getCount({
        query: this.getFilterQuery(this.state.filter),
      });

      this.setState({
        count,
      });

      await this.loadPage();
    } catch (error) {
      errorHandler(error);
    }
  }

  loadPage = async (options?: Partial<IState>) => {
    try {
      this.setState({
        loading: true,
      });

      const pageOptions = { ...this.state, ...options };

      const isReverseSort = pageOptions.sortDirection === 'desc';

      const sort = isReverseSort ? `-${pageOptions.sort} -_id` : `${pageOptions.sort} _id`;

      const transactions = await TransactionService.getList({
        populate: 'bankAccount category',
        sort,
        limit: pageOptions.rowsPerPage,
        skip: pageOptions.page * pageOptions.rowsPerPage,
        query: this.getFilterQuery(pageOptions.filter),
      });

      this.setState({
        transactions,
        loading: false,
        selected: [],
      });
    } catch (error) {
      errorHandler(error);
    }
  }

  handleChangeRowPerPage = (event: React.ChangeEvent<{ name?: string; value: number }>) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,
    });

    this.loadPage({
      rowsPerPage: event.target.value,
      page: 0,
    });
  }

  handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, newPage: number) => {
    this.setState({
      page: newPage,
    });

    this.loadPage({
      page: newPage,
    });
  }

  handleChangeSortOrder = () => {
    const newSortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
    this.setState({
      page: 0,
      sortDirection: newSortDirection,
    });

    this.loadPage({
      page: 0,
      sortDirection: newSortDirection,
    });
  }

  handleRowClick = (event: React.MouseEvent, item: ITransaction) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(item._id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, item._id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({
      selected: newSelected,
    });
  }

  handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { transactions } = this.state;
    if (event.target.checked) {
      const newSelecteds = transactions.map(item => item._id);
      this.setState({
        selected: newSelecteds,
      });
      return;
    }

    this.setState({
      selected: [],
    });
  }

  handleChangeCategory = async (category: string) => {
    if (category.toLowerCase() === 'null') {
      category = null;
    }

    this.setState({ loading: true, showUpdateCateogryDialog: false });
    await TransactionService.updateCategory(category, this.state.selected);

    if (this.state.filter.category) {
      await this.loadData();
    } else {
      await this.loadPage();
    }
  }

  handleApplyFilter = async (values: IFilter) => {
    this.setState({
      filter: values,
      showFilterDialog: false,
    }, () => {
      this.loadData();
      this.updateLocation();
    });
  }

  handleConfirmDelete = async () => {
    this.setState({
      deleting: true,
    });

    try {
      await TransactionService.deleteMany(this.state.selected);

      this.setState({
        showConfirmDelete: false,
        deleting: false,
      });

      this.loadPage();
    } catch {
      this.setState({
        deleting: false,
      });
    }
  }

  handleApplyRule = async () => {
    try {
      await TransactionService.applyRules(this.state.selected);
      this.loadData();
    } catch {
      //
    }
  }

  renderHeader() {
    const { selected, transactions } = this.state;

    const enableEdit = selected.length === 1 && transactions.findIndex(x => x._id === selected[0] && x.isPostDated) !== -1;

    return (
      <Header
        title="Transactions"
        drawerMenu
        rightComponent={(
          <View flexDirection="row">
            <Header.IconButton onClick={() => this.setState({ showFilterDialog: true })}><FilterIcon /></Header.IconButton>
            <MoreMenu
              actions={[{
                label: 'Add post dated transactions',
                action: () => this.props.history.push('/transaction/add'),
                icon: <AddIcon />,
              }, {
                label: 'View transaction',
                action: () => this.props.history.push(`/transaction/${selected[0]}`),
                icon: <ViewIcon />,
                visible: selected.length === 1,
              }, {
                label: 'Change category',
                action: () => this.setState({ showUpdateCateogryDialog: true }),
                icon: <CategoryIcon />,
                visible: selected.length > 0,
              }, {
                label: 'Apply rules',
                action: this.handleApplyRule,
                icon: <RuleIcon />,
                visible: selected.length > 0,
              }, {
                label: 'Edit transaction',
                action: () => this.props.history.push(`/transaction/edit/${selected[0]}`),
                icon: <EditIcon />,
                visible: selected.length === 1,
                disabled: !enableEdit,
              }, {
                label: 'Delete transaction' + (selected.length > 1 ? 's' : ''),
                action: () => this.setState({ showConfirmDelete: true }),
                icon: <DeleteIcon />,
                visible: selected.length > 0,
              }]}
            />
          </View>
        )}
      />
    );
  }

  renderTableHeader() {
    const { selected, transactions } = this.state;
    const numSelected = selected.length;
    const rowCount = transactions.length;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" style={{ zIndex: 1 }}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected > 0 && numSelected === rowCount}
              onChange={this.handleSelectAllClick}
            />
          </TableCell>
          <TableCell style={{ minWidth: 100, zIndex: 1 }}>Bank account</TableCell>
          <TableCell style={{ minWidth: 120, zIndex: 1 }}>
            <TableSortLabel
              active={this.state.sort === 'transactionDate'}
              direction={this.state.sortDirection}
              onClick={this.handleChangeSortOrder}
            >
              Transaction date
            </TableSortLabel>
          </TableCell>
          <TableCell style={{ zIndex: 1 }}>Category</TableCell>
          <TableCell style={{ zIndex: 1 }}>Narration</TableCell>
          <TableCell align="right" style={{ minWidth: 160, zIndex: 1 }}>Amount</TableCell>
        </TableRow>
      </TableHead>
    );
  }

  renderTableBody() {
    const { transactions, selected } = this.state;

    const isSelected = (_id: string) => selected.indexOf(_id) !== -1;
    return (
      <TableBody>
        {transactions.map((item: ITransaction) => {
          const selected = isSelected(item._id);
          return (
            <TableRow key={item._id} selected={selected} hover onDoubleClick={() => this.props.history.push(`/transaction/${item._id}`)}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected}
                  onClick={(event) => this.handleRowClick(event, item)}
                />
              </TableCell>
              <TableCell style={{ minWidth: 100 }}>{(item.bankAccount as IBankAccount).bankAccountAliasName}</TableCell>
              <TableCell style={{ minWidth: 120 }}>{formatDate(item.transactionDate)}</TableCell>
              <TableCell>{Boolean(item.category) && (item.category as ICategory).name}</TableCell>
              <TableCell>{item.narration}</TableCell>
              <TableCell align="right" style={{ minWidth: 160, color: item.amount > 0 ? 'green' : 'red' }}>
                {formatCurrency(Math.abs(item.amount))} {item.amount > 0 ? 'CR' : 'DR'}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    );
  }

  renderPagination() {
    const { page, count, rowsPerPage } = this.state;

    if (!count) {
      return null;
    }

    return (
      <TablePagination
        rowsPerPageOptions={[10, 50, 100]}
        page={page}
        count={count}
        rowsPerPage={rowsPerPage}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowPerPage}
      />
    );
  }

  render() {
    const { loading, showUpdateCateogryDialog, showFilterDialog } = this.state;
    return (
      <View flexGrow>
        {this.renderHeader()}
        <ScrollView style={{ overflowX: 'auto' }}>
          <Table stickyHeader>
            {this.renderTableHeader()}
            {this.renderTableBody()}
          </Table>
        </ScrollView>
        <ActionFooter>
          {loading && <CircularProgress size={24} />}
          {this.renderPagination()}
        </ActionFooter>
        <UpdateCategoryModal
          open={showUpdateCateogryDialog}
          onClose={() => this.setState({ showUpdateCateogryDialog: false })}
          onSubmit={this.handleChangeCategory}
        />
        <FilterDialog
          open={showFilterDialog}
          onClose={() => this.setState({ showFilterDialog: false })}
          onApply={this.handleApplyFilter}
          initialValue={this.state.filter}
        />
        <DeleteConfirmDialog
          open={this.state.showConfirmDelete}
          onClose={() => this.setState({ showConfirmDelete: false })}
          onConfirm={this.handleConfirmDelete}
          recordCount={this.state.selected.length}
          deleting={this.state.deleting}
        />
      </View>
    );
  }
}

export default Transactions;
