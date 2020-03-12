import { ScrollView } from '@app/components';
import { getSizeString } from '@app/helpers/common.helper';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

interface IProps {
  files: File[];
  onRemove: (index: number) => void;
  onAdd: () => void;
}

const FileList: React.FC<IProps> = (props) => {
  return (
    <ScrollView>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="center" style={{ width: 32, paddingRight: 8 }} padding="none">
              <IconButton color="primary" onClick={props.onAdd}>
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.files.map((item, index) => (
            <TableRow key={String(index)}>
              <TableCell>{String(index + 1)}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell align="right">{getSizeString(item.size)}</TableCell>
              <TableCell align="center" style={{ width: 32, paddingRight: 8 }} padding="none">
                <IconButton color="secondary" onClick={() => props.onRemove(index)}>
                  <CloseIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollView>
  );
};

export default FileList;
