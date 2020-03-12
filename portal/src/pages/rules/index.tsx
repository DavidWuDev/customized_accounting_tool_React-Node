import { RuleService } from '@app/services';
import { withLayout } from 'layouts';
import { dataViewHoc } from '../data-view';

const rulesPage = dataViewHoc({
  name: 'rule',
  title: 'Rule',
  service: RuleService,
  columns: [{
    title: 'Name',
    name: 'name',
  }, {
    title: 'Order',
    name: 'order',
  }, {
    title: 'Status',
    name: 'inactive',
    transform: (value) => value ? 'Inactive' : 'Active',
  }],
  allowAdd: true,
  allowView: false,
  allowEdit: true,
  allowDelete: true,
  showMoreActions: true,
});

export default withLayout(rulesPage);
