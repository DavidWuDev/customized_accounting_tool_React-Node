import { ActionFooter, View } from '@app/components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import React, { Component } from 'react';

import { errorHandler } from '@app/helpers/common.helper';
import { TransactionService } from '@app/services';
import { ITransaction } from '@app/types';
import { CircularProgress, Typography } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import FileList from './file-list.comonent';
import { IAccountInfo } from './import-statement.types';

interface IProps {
  accountInfo: IAccountInfo;
  onContinue: (transactions: ITransaction[]) => void;
  onGoBack: () => void;
}

interface IState {
  files: File[];
  isUploading: boolean;
  progress: number;
}

class StepSelectFiles extends Component<IProps, IState> {
  state: IState = {
    files: [],
    isUploading: false,
    progress: 0,
  };

  handleDropFiles = (files: any[]) => {
    this.setState((state) => ({
      files: [...state.files, ...files],
    }));
  }

  handleRemoveFile = (index: number) => {
    this.setState((state) => {
      const files = state.files;
      files.splice(index, 1);
      return {
        files: [...files],
      };
    });
  }

  handleUploadFiles = async () => {
    this.setState({
      isUploading: true,
      progress: 0,
    });

    try {
      const transactions = await TransactionService.import(
        this.props.accountInfo.bankAccount._id,
        this.props.accountInfo.template._id,
        this.state.files,
        (snapshot) => {
          if (!snapshot.total) {
            return;
          }

          const progress = Math.round((snapshot.loaded * 100) / snapshot.total);

          this.setState({
            progress,
          });
        },
      );

      this.setState({
        progress: 100,
      });

      this.props.onContinue(transactions);
    } catch (error) {
      errorHandler(error);
      this.setState({
        isUploading: false,
      });
    }
  }

  renderUploading() {
    if (this.state.progress < 100) {
      return (
        <View flexGrow>
          <View flexGrow flexDirection="column" alignItems="center" justifyContent="center">
            <CloudUploadIcon color="action" style={{ fontSize: 72 }} />
            <Typography variant="h5" color="textSecondary">{this.state.progress}%</Typography>
            <CircularProgress thickness={0.5} size={160} color="primary" value={this.state.progress} variant="static" style={{ position: 'absolute' }} />
          </View>
          <ActionFooter />
        </View>
      );
    }

    return (
      <View flexGrow>
        <View flexGrow flexDirection="column" alignItems="center" justifyContent="center">
          <CloudDoneIcon color="primary" style={{ fontSize: 72 }} />
          <CircularProgress thickness={0.5} size={160} color="primary" variant="indeterminate" style={{ position: 'absolute' }} />
        </View>
        <ActionFooter />
      </View>
    );
  }

  render() {
    if (this.state.isUploading) {
      return this.renderUploading();
    }

    return (
      <View flexGrow>
        <View flexGrow style={{ position: 'relative' }}>
          <Dropzone onDrop={this.handleDropFiles} noClick={this.state.files.length > 0}>
            {({ getRootProps, getInputProps, isDragActive, open }) => (
              <div style={{ display: 'flex', flex: 1, flexDirection: 'column', overflow: 'hidden' }} {...getRootProps()}>
                {this.state.files.length > 0 && (
                  <View flexGrow>
                    <FileList
                      files={this.state.files}
                      onAdd={() => open()}
                      onRemove={(index) => this.handleRemoveFile(index)}
                    />
                  </View>
                )}
                <input {...getInputProps()} />
                <div style={{ position: 'absolute', background: 'rgba(255, 255, 255, 0.8)', left: 0, top: 0, right: 0, bottom: 0, display: (this.state.files.length === 0 || isDragActive) ? 'flex' : 'none', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  {/* {this.state.files.length === 0 && <input {...getInputProps()} />} */}
                  <View flexDirection="column" alignItems="center" justifyContent="center" style={{ backgroundColor: isDragActive ? '#dfdfdf' : 'transparent', borderRadius: '50%', width: 256, height: 256 }}>
                    <FileCopyIcon color="action" style={{ fontSize: 96 }} />
                    <div style={{ marginTop: 16 }}>
                      <Typography variant="h6" color="textSecondary">
                        Drop files here
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        or click here to select file
                    </Typography>
                    </div>
                  </View>
                </div>
              </div>
            )}
          </Dropzone>
        </View>
        <ActionFooter>
          <View flexDirection="row">
            <ActionFooter.ActionButton color="default" onClick={this.props.onGoBack}>
              <ArrowBackIcon />
              &nbsp;Back
            </ActionFooter.ActionButton>
          </View>
          <View flexGrow />
          <View flexDirection="row">
            <ActionFooter.ActionButton variant="outlined" color="primary" onClick={this.handleUploadFiles} disabled={this.state.files.length === 0}>
              Continue&nbsp;
            <ArrowForwardIcon />
            </ActionFooter.ActionButton>
          </View>
        </ActionFooter>
      </View >
    );
  }
}

export default StepSelectFiles;
