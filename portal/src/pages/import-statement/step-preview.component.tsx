import { ActionFooter, ScrollView, View } from '@app/components';
import { formatCurrency, formatDate } from '@app/helpers/locale.helper';
import { ITransaction } from '@app/types';
import { Table, TableBody, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const styles = {
  columnNo: {
    width: 30,
    minWidth: 30,
  },
  columnDate: {
    width: 80,
    minWidth: 80,
  },
  columnAmount: {
    width: 100,
    minWidth: 100,
  },
  columnPadding0: {
    padding: '0px !important',
    '&>div>div': {
      padding: '14px 30px 14px 16px',
    },
  },
  wordWrap: {
    'overflow-wrap': 'break-word',
  },
  tableCell: {
    padding: '14px 30px 14px 16px',
  },
};

interface IProps {
  transactions: ITransaction[];
  onImportAgain: () => void;
  classes: any;
}

const StepPreview: React.FC<IProps> = (props) => {
  const { classes, transactions } = props;
  const tableBodyRef = useRef(null);
  const tableParentRef = useRef(null);

  useEffect(() => {
    const tableParentEle = ReactDOM.findDOMNode(tableParentRef.current) as HTMLTableElement;
    const tableBodyEle = ReactDOM.findDOMNode(tableBodyRef.current) as HTMLTableElement;
    tableParentEle.style.width = tableBodyEle.scrollWidth + 'px';
  });

  return (
    <View flexGrow>
      <View flexGrow style={{ overflowX: 'auto' }}>
        <View flexGrow divRef={tableParentRef}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell classes={{ root: classes.tableCell }} className={classes.columnNo}>#</TableCell>
                <TableCell classes={{ root: classes.tableCell }} className={classes.columnDate}>Date</TableCell>
                <TableCell classes={{ root: classes.tableCell }} className={classes.columnDate}>Value date</TableCell>
                <TableCell classes={{ root: classes.tableCell }} className={classes.columnPadding0}>
                  <View flexDirection="row" flexGrow alignItems="center">
                    <View flexGrow>Narration</View>
                    <View flexGrow>Reference</View>
                  </View>
                </TableCell>
                <TableCell classes={{ root: classes.tableCell }} className={classes.columnAmount} align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <ScrollView>
            <Table ref={tableBodyRef}>
              <TableBody>
                {transactions.map((item, index) => (
                  <TableRow key={String(index)}>
                    <TableCell classes={{ root: classes.tableCell }} className={classes.columnNo}>
                      {(index + 1)}
                    </TableCell>
                    <TableCell classes={{ root: classes.tableCell }} className={classes.columnDate}>{formatDate(item.transactionDate)}</TableCell>
                    <TableCell classes={{ root: classes.tableCell }} className={classes.columnDate}>{formatDate(item.valueDate)}</TableCell>
                    <TableCell classes={{ root: classes.tableCell }} className={classes.columnPadding0}>
                      <View flexDirection="row" flexGrow alignItems="center">
                        <View flexGrow className={classes.wordWrap}>{item.narration}</View>
                        <View flexGrow className={classes.wordWrap}>{item.reference}</View>
                      </View>
                    </TableCell>
                    <TableCell classes={{ root: classes.tableCell }} className={classes.columnAmount} align="right">{formatCurrency(item.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollView>
        </View>
      </View>
      <ActionFooter>
        <View flexDirection="row" flexGrow justifyContent="center">
          <ActionFooter.ActionButton variant="contained" color="primary" size="large" style={{ borderRadius: 48 }} onClick={props.onImportAgain}>
            Import more
          </ActionFooter.ActionButton>
        </View>
      </ActionFooter>
    </View>
  );
};

export default withStyles(styles)(StepPreview);
