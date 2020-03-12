import { formatCurrency } from '@app/helpers/locale.helper';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow, Typography, IconButton, useTheme, useMediaQuery, Theme } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import React from 'react';

interface IProps {
  detail: any;
  onClose: () => void;
}

const IncomeTaxDetail: React.FC<IProps> = (props) => {
  const theme = useTheme<Theme>();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { detail } = props;

  if (!detail) {
    return null;
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="md"
      disableBackdropClick
      // open={props.open}
      open
      onClose={props.onClose}
    >
      <DialogTitle disableTypography style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography variant="h6" style={{ flex: 1 }}>
          Income tax detail
        </Typography>
        <IconButton style={{ padding: 4 }} onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ padding: 0 }} dividers>
        <Table>
          {/* <TableBody>
            <TableCell style={{ backgroundColor: 'red' }}></TableCell>
            <TableCell style={{ backgroundColor: 'green' }}></TableCell>
            <TableCell style={{ backgroundColor: 'red' }}></TableCell>
            <TableCell style={{ backgroundColor: 'green' }}></TableCell>
            <TableCell style={{ backgroundColor: 'red' }}></TableCell>
            <TableCell style={{ backgroundColor: 'green' }}></TableCell>
          </TableBody> */}
          <TableBody>
            <TableRow>
              <TableCell colSpan={6}><Typography variant="subtitle2">Income</Typography></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={4}>Income from Business and Profession</TableCell>
              <TableCell align="right">{formatCurrency(detail.totalTaxableAmount, 0)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell colSpan={2}>Turnover</TableCell>
              <TableCell align="right">{formatCurrency(detail.totalIncome, 0)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Current income</i></TableCell>
              <TableCell align="right"><i>{formatCurrency(detail.income, 0)}</i></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Future incomes</i></TableCell>
              <TableCell align="right"><i>{formatCurrency(detail.futureIncome, 0)}</i></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell colSpan={2}>Presumptive Income @55% of Gross Turnover U/s 44ADA</TableCell>
              <TableCell align="right">{formatCurrency(detail.totalTaxableAmount, 0)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={4}>Income from other source</TableCell>
              <TableCell align="right">{formatCurrency(0, 0)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell><Typography variant="subtitle2">Grand total income</Typography></TableCell>
              <TableCell align="right"><Typography variant="subtitle2">{formatCurrency(20000, 0)}</Typography></TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell colSpan={6}><Typography variant="subtitle2">Exemptions</Typography></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={4}>Deductions under Chapter-VI-A</TableCell>
              <TableCell align="right">{formatCurrency(0, 0)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell colSpan={1}>Deduction under section 80C</TableCell>
              <TableCell align="right">{formatCurrency(0, 0)}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell colSpan={1}>Deduction under section 80D</TableCell>
              <TableCell align="right">{formatCurrency(0, 0)}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell colSpan={1}>Deduction under section 80G</TableCell>
              <TableCell align="right">{formatCurrency(0, 0)}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell colSpan={1}>Deduction under section 80GG</TableCell>
              <TableCell align="right">{formatCurrency(0, 0)}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell colSpan={1}>Deduction under section 80TTA</TableCell>
              <TableCell align="right">{formatCurrency(0, 0)}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell><Typography variant="subtitle2">Total Exemptions</Typography></TableCell>
              <TableCell align="right"><Typography variant="subtitle2">{formatCurrency(0, 0)}</Typography></TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5}><Typography variant="subtitle2">Taxable income</Typography></TableCell>
              <TableCell align="right"><Typography variant="subtitle2">{formatCurrency(detail.totalTaxableAmount, 0)}</Typography></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5}><Typography variant="subtitle2">Tax payble</Typography></TableCell>
              <TableCell align="right"><Typography variant="subtitle2">{formatCurrency(detail.totalTax, 0)}</Typography></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={2}>Less than {formatCurrency(250000, 0)} (0%)</TableCell>
              <TableCell align="right">{formatCurrency(Math.min(detail.totalTaxableAmount, 250000), 0)}</TableCell>
              <TableCell align="right">{formatCurrency(0, 0)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={2}>{formatCurrency(250001, 0)} to {formatCurrency(500000, 0)} (5%)</TableCell>
              <TableCell align="right">{formatCurrency(Math.max(Math.min(detail.totalTaxableAmount, 500000) - 250000, 0), 0)}</TableCell>
              <TableCell align="right">{formatCurrency(Math.max(Math.min(detail.totalTaxableAmount, 500000) - 250000, 0) * 0.05, 0)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={2}>{formatCurrency(500001, 0)} to {formatCurrency(1000000, 0)} (20%)</TableCell>
              <TableCell align="right">{formatCurrency(Math.max(Math.min(detail.totalTaxableAmount, 1000000) - 500000, 0), 0)}</TableCell>
              <TableCell align="right">{formatCurrency(Math.max(Math.min(detail.totalTaxableAmount, 1000000) - 500000, 0) * 0.2, 0)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={2}>More than {formatCurrency(1000000, 0)} (30%)</TableCell>
              <TableCell align="right">{formatCurrency(Math.max(detail.totalTaxableAmount - 1000000, 0), 0)}</TableCell>
              <TableCell align="right">{formatCurrency(Math.max(detail.totalTaxableAmount - 1000000, 0) * 0.3, 0)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={6}>
                <Typography variant="h6">
                  {formatCurrency(detail.totalTax)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button color="default" onClick={props.onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IncomeTaxDetail;
