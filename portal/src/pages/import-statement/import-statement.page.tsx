import { Header, View } from '@app/components';
import { ITransaction } from '@app/types';
import { Step, StepLabel, Stepper } from '@material-ui/core';
import React, { useState } from 'react';
import { IAccountInfo } from './import-statement.types';
import StepPreview from './step-preview.component';
import StepSelectAccount from './step-select-account.component';
import StepSelectFiles from './step-select-files.component';

const ImportStatementPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [accountInfo, setAccountInfo] = useState<IAccountInfo>(null);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const handleContinueSelectAccount = (value: IAccountInfo) => {
    setAccountInfo(value);
    setActiveStep(1);
  };

  const handleContinueUpload = (transactions: ITransaction[]) => {
    setTransactions(transactions);
    setActiveStep(2);
  };

  return (
    <View flexGrow>
      <Header title="Import statement" drawerMenu />
      <Stepper alternativeLabel activeStep={activeStep}>
        <Step>
          <StepLabel>Select account</StepLabel>
        </Step>
        <Step disabled>
          <StepLabel>Choose files</StepLabel>
        </Step>
        <Step>
          <StepLabel>Imported preview</StepLabel>
        </Step>
      </Stepper>
      <View flexGrow>
        {activeStep === 0 && <StepSelectAccount accountInfo={accountInfo} onSubmit={handleContinueSelectAccount} />}
        {activeStep === 1 && <StepSelectFiles accountInfo={accountInfo} onContinue={handleContinueUpload} onGoBack={() => setActiveStep(0)} />}
        {activeStep === 2 && <StepPreview transactions={transactions} onImportAgain={() => setActiveStep(0)} />}
      </View>
    </View>
  );
};

export default ImportStatementPage;
