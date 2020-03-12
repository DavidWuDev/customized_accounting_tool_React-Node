import { formatCurrency } from '@app/helpers/locale.helper';
import { PersonService } from '@app/services';
import { withLayout } from 'layouts';
import { dataViewHoc } from '../data-view';

const personsPage = dataViewHoc({
  name: 'person',
  title: 'Person',
  service: PersonService,
  columns: [{
    title: 'Name',
    name: 'fullName',
  }, {
    title: 'PAN',
    name: 'pan',
  }, {
    title: 'Monthly income',
    name: 'monthlyIncome',
    align: 'right',
    transform: (item) => formatCurrency(item),
  }],
  allowAdd: true,
  allowView: true,
  allowEdit: true,
});

export default withLayout(personsPage);
