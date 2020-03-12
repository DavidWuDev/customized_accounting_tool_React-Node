import { DataLookup } from '@app/components';
import { BankAccountService, CategoryService } from '@app/services';
import { ILookup } from '@app/types';
import { TextField } from '@material-ui/core';
import React from 'react';

const operators = {
  '_$eq': 'Equal',
  '_$ne': 'Not equal',
  '_$content': 'Content',
  '_$gt': 'Greater than',
  '_$lt': 'Less than',
  '_$gte': 'Greater than or equal',
  '_$lte': 'Less than or equal',
};

const fields = {
  narration: 'Narration',
  amount: 'Amount',
  category: 'Category',
  bankAccount: 'Bank account',
};

const getOperatorLookup = (key: string): ILookup => {
  return {
    value: key,
    label: operators[key],
  };
};

export const fieldLookup = Object.keys(fields).map(x => ({
  label: fields[x],
  value: x,
}));

export const fieldOperatorLookupMap = {
  narration: ['_$eq', '_$content'].map(getOperatorLookup),
  amount: ['_$eq', '_$gt', '_$gte', '_$lt', '_$lte'].map(getOperatorLookup),
  category: ['_$eq', '_$ne'].map(getOperatorLookup),
  bankAccount: ['_$eq'].map(getOperatorLookup),
};

interface IControlProps {
  value: any;
  onChange: (e: any) => void;
}

export const defaultControl = (props: IControlProps) => <TextField {...props} />;

export const fieldControlMap = {
  narration: (props: IControlProps) => <TextField {...props} />,
  amount: (props: IControlProps) => <TextField type="number" {...props} onChange={e => {
    const value = e.target.value ? Number(e.target.value) : null;
    props.onChange({ target: { value }});
  }} />,
  category: (props: IControlProps) => (
    <DataLookup
      service={CategoryService}
      predata={[{
        _id: 'null',
        name: 'Blank category',
      }]}
      {...props}
    />
  ),
  bankAccount: (props: IControlProps) => (
    <DataLookup
      service={BankAccountService}
      {...props}
    />
  ),
};
