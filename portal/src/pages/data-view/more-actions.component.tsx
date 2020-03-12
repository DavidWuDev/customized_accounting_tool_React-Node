import { Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
  menu: {
    minWidth: 200,
  },
});

interface IProps {
  allowView?: boolean;
  allowEdit?: boolean;
  allowDelete?: boolean;
  anchorEl?: Element;
  onClose?: () => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const MoreActions: React.FC<IProps> = (props) => {
  const { allowView, allowEdit, allowDelete, anchorEl, onClose, onView, onEdit, onDelete } = props;
  const classes = useStyles(props);

  const handleAction = (action: () => void) => () => {
    onClose();
    action();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{
        className: classes.menu,
      }}
    >
      {allowView && <MenuItem onClick={handleAction(onView)}>View</MenuItem>}
      {allowEdit && <MenuItem onClick={handleAction(onEdit)}>Edit</MenuItem>}
      {allowDelete && <MenuItem onClick={handleAction(onDelete)}>Delete</MenuItem>}
    </Menu>
  );
};

export default MoreActions;
