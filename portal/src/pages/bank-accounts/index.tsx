import { BankAccountService } from '@app/services';
import { withLayout } from 'layouts';
import { dataViewHoc } from '../data-view';

const personsPage = dataViewHoc({
  name: 'bank-account',
  title: 'Bank account',
  service: BankAccountService,
  columns: [{
    title: 'Name',
    name: 'accountName',
  }, {
    title: 'Bank name',
    name: 'bankAccountAliasName',
  }, {
    title: 'Account number',
    name: 'accountNumber',
  }, {
    title: 'Branch',
    name: 'branch',
  }, {
    title: 'IFSC',
    name: 'ifsc',
  }],
  allowAdd: true,
  allowView: true,
  allowEdit: true,
});

export default withLayout(personsPage);
