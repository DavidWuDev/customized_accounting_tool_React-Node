import { View } from '@app/components';
import { ILookup } from '@app/types';
import { IconButton, makeStyles, MenuItem, TextField } from '@material-ui/core';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveCircleOutline';
import React from 'react';
import { defaultControl, fieldControlMap, fieldLookup, fieldOperatorLookupMap } from './condition-row.helper';
import { IGroupValue, IRowValue } from './condition-rule.types';
import RowActionMenu from './row-action-menu.component';

const useStyles = makeStyles({
  root: {
    '&:hover $actionButton': {
      opacity: 1,
    },
  },
  actionButton: {
    opacity: 0,
  },
});

interface IProps<T = string> {
  index: number;
  condition: IRowValue<T> | IGroupValue;
  onRemove: () => void;
  onChange: (value: IRowValue<T> | IGroupValue) => void;
  showRemove: boolean;
  error: boolean;
  onGroup: () => void;
  onUngroup: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const ConditionRow: React.FC<IProps> = (props) => {
  const { condition, onRemove, onChange } = props;
  const classes = useStyles(props);

  const handleChangeField = (field: string) => {
    onChange({
      field,
      operator: '',
      value: '',
    });
  };

  const handleChangeOperator = (operator: string) => {
    onChange({
      ...condition,
      operator,
    });
  };

  const handleChangeValue = (value: any) => {
    onChange({
      ...condition,
      value,
    });
  };

  const rowValue = condition as IRowValue;
  const Control = fieldControlMap[rowValue.field] || defaultControl;

  return (
    <View flexDirection="row" alignItems="center" className={classes.root}>
      <View style={{ marginRight: 8, minWidth: 160 }}>
        <TextField
          select
          variant="outlined"
          margin="dense"
          placeholder="Select field"
          value={rowValue.field}
          onChange={e => handleChangeField(e.target.value)}
        >
          {fieldLookup.map((x: ILookup) => (
            <MenuItem key={x.value} value={x.value}>{x.label}</MenuItem>
          ))}
        </TextField>
      </View>
      {Boolean(rowValue.field) && (
        <React.Fragment>
          <View style={{ marginRight: 8, minWidth: 160 }}>
            <TextField
              select
              margin="dense"
              variant="outlined"
              value={rowValue.operator}
              onChange={e => handleChangeOperator(e.target.value)}
              disabled={!Boolean(fieldOperatorLookupMap[rowValue.field])}
            >
              {(fieldOperatorLookupMap[rowValue.field] || []).map((x: ILookup) => (
                <MenuItem key={x.value} value={x.value}>{x.label}</MenuItem>
              ))}
            </TextField>
          </View>
          {Boolean(rowValue.operator) && (
            <View style={{ marginRight: 8, minWidth: 160 }}>
              <Control
                margin="dense"
                variant="outlined"
                value={rowValue.value}
                onChange={(e: any) => handleChangeValue(e.target.value)}
              />
            </View>
          )}
        </React.Fragment>
      )}
      <div className={classes.actionButton}>
        <RowActionMenu
          actions={[{
            label: 'Group',
            action: props.onGroup,
          }, {
            label: 'Ungroup',
            action: props.onUngroup,
          }, {
            label: 'Move up',
            action: props.onMoveUp,
          }, {
            label: 'Move down',
            action: props.onMoveDown,
          }, {
            label: 'Remove',
            action: props.onRemove,
          }]}
        />
      </div>
      {props.showRemove && (
        <IconButton style={{ color: 'red' }} onClick={onRemove} size="small">
          <RemoveOutlinedIcon />
        </IconButton>
      )}
    </View>
  );
};

export default ConditionRow;