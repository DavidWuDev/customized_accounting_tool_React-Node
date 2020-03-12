import { View } from '@app/components';
import { IconButton, MenuItem, Select, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.caption.fontSize,
    marginRight: -16,
  },
  actionIconContainer: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

interface IProps {
  rowsPerPageOptions: number[];
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<{ name?: string; value: number }>) => void;
}

const TablePagination: React.FC<IProps> = (props) => {
  const classes = useStyles(props);
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const { count, page, rowsPerPage, onChangePage, rowsPerPageOptions, onChangeRowsPerPage } = props;

  function handleFirstPageButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  const from = count === 0 ? 0 : page * rowsPerPage + 1;
  const to = Math.min(count, (page + 1) * rowsPerPage);

  return (
    <View flexGrow flexDirection="row" justifyContent="end" alignItems="center" className={classes.root}>
      {!isMobile && (
        <React.Fragment>
          <Typography variant="caption">
            Rows per page:
          </Typography>
          <Select style={{ marginLeft: 8, marginRight: 32, color: 'inherit', fontSize: 'inherit', flexShrink: 0 }} disableUnderline value={rowsPerPage} onChange={onChangeRowsPerPage}>
            {rowsPerPageOptions.map(item => (
              <MenuItem key={String(item)} value={item}>{item}</MenuItem>
            ))}
          </Select>
        </React.Fragment>
      )}
      <Typography variant="caption">
        {from}-{to} of {count}
      </Typography>
      <div className={classes.actionIconContainer}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          <LastPageIcon />
        </IconButton>
      </div>
    </View>
  );
};

export default TablePagination;
