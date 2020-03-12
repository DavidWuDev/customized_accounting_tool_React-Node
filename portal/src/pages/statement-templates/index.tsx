import { StatementTemplateService } from '@app/services';
import { IBank } from '@app/types';
import { withLayout } from 'layouts';
import { dataViewHoc } from '../data-view';

const statementTemplatesPage = dataViewHoc({
  name: 'statement-template',
  title: 'Statement template',
  service: StatementTemplateService,
  populate: 'bank',
  columns: [{
    title: 'Bank',
    name: 'bank',
  }, {
    title: 'Name',
    name: 'name',
  }, {
    title: 'Code',
    name: 'code',
  }, {
    title: 'Extension',
    name: 'extension',
  }],
  allowAdd: true,
  allowView: true,
  allowEdit: true,
  dataTransformer: (item) => {
    return {
      ...item,
      bank: (item.bank as IBank).name,
    };
  },
});

export default withLayout(statementTemplatesPage);
