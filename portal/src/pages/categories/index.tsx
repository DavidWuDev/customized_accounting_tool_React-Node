import { getCategoryNature } from '@app/helpers/common.helper';
import { CategoryService } from '@app/services';
import { withLayout } from 'layouts';
import { dataViewHoc } from '../data-view';

const categoryPage = dataViewHoc({
  name: 'category',
  title: 'Category',
  pluralName: 'categories',
  pluralTitle: 'Categories',
  service: CategoryService,
  columns: [{
    title: 'Name',
    name: 'name',
  }, {
    title: 'Nature',
    name: 'nature',
  }],
  allowAdd: true,
  allowEdit: true,
  dataTransformer: (item) => {
    return {
      ...item,
      nature: getCategoryNature(item.nature),
    };
  },
});

export default withLayout(categoryPage);
