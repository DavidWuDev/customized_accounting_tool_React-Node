import { BankService } from '@app/services';
import { withLayout } from 'layouts';
import { dataViewHoc } from '../data-view';

const banksPage = dataViewHoc({
  name: 'bank',
  title: 'Bank',
  service: BankService,
  columns: [{
    title: 'Name',
    name: 'name',
  }, {
    title: 'Alias',
    name: 'aliasName',
  }],
  allowAdd: true,
  allowView: true,
  allowEdit: true,
});

export default withLayout(banksPage);
