import { IData } from '@app/types';
import React from 'react';
import { DataViewStyled } from './data-view.component';
import { IDataViewProps } from './data-view.types';

export const dataViewHoc = <T extends IData, P extends {}>(props: IDataViewProps<T, P>) => {
  return () => (
    <DataViewStyled
      {...props}
    />
  );
};
