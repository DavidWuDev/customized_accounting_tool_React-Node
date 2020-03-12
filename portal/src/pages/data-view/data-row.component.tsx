import { View } from '@app/components';
import { IData } from '@app/types';
import { IconButton, TableCell, TableRow, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/CreateOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { IColumn } from './data-view.types';

const useStyles = makeStyles({
  dataRow: {
    '&:hover $tableCellAction': {
      visibility: 'visible',
    },
  },
  dataRowHover: {
    '&:hover': {
      cursor: 'pointer',
      background: 'rgba(0, 0, 0, 0.03) !important',
    },
  },
  actionButton: {
    padding: 10,
    color: 'rgba(0, 0, 0, 0.37)',
    '&:hover': {
      color: 'rgba(0, 0, 0, 0.54)',
      background: 'transparent',
    },
    '& svg': {
      fontSize: '1.4rem',
    },
  },
  tableCellAction: {
    visibility: 'hidden',
  },
});

interface IProps<T> {
  item: T;
  columns: Array<IColumn<T>>;
  allowView?: boolean;
  allowEdit?: boolean;
  showActions?: boolean;
  showMoreActions?: boolean;
  onView: (item: T) => void;
  onEdit: (item: T) => void;
  onMoreAction: (item: T, e: React.MouseEvent<any>) => void;
}

const DataRow = <T extends IData>(props: IProps<T>) => {
  const { item, allowView, allowEdit, columns, showActions, showMoreActions, onView, onEdit, onMoreAction } = props;
  const classes = useStyles(props);

  return (
    <TableRow
      hover={allowView}
      classes={{ hover: classes.dataRowHover }}
      className={classes.dataRow}
      onClick={() => onView(item)}
    >
      {columns.map((column, index) => (
        <TableCell key={String(index)} align={column.align}>{column.transform ? column.transform(item[column.name], item) : item[column.name]}</TableCell>
      ))}
      {showActions && (
        <TableCell align="right" padding="none">
          <View flexDirection="row" justifyContent="end" className={classes.tableCellAction}>
            {allowEdit && (
              <IconButton
                className={classes.actionButton}
                disableRipple
                disableFocusRipple
                disableTouchRipple
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit(item);
                }}
              >
                <Tooltip title="Edit">
                  <EditIcon />
                </Tooltip>
              </IconButton>
            )}
            {showMoreActions && (
              <IconButton
                className={classes.actionButton}
                disableRipple
                disableFocusRipple
                disableTouchRipple
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onMoreAction(item, e);
                }}
              >
                <Tooltip title="More actions">
                  <MoreVertIcon />
                </Tooltip>
              </IconButton>
            )}
          </View>
        </TableCell>
      )}
    </TableRow>
  );
};

export default DataRow;
