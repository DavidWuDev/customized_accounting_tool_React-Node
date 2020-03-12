import { IconButton, ListItemText, Menu, MenuItem } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVertOutlined';
import React, { useState } from 'react';

interface IProps {
  actions: Array<{
    label: string;
    action: () => void;
  }>;
}

const RowActionMenu: React.FC<IProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAction = (action: () => void) => {
    setAnchorEl(null);

    if (action) {
      action();
    }
  };

  return (
    <React.Fragment>
      <IconButton size="small" onClick={e => setAnchorEl(e.currentTarget)}>
        <MoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {props.actions.map((item, index) => (
          <MenuItem key={String(index)} onClick={() => handleAction(item.action)}>
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
        {/* <MenuItem onClick={handleGroup}>Group</MenuItem>
        <MenuItem onClick={props.onUngroup}>Ungroup</MenuItem>
        <MenuItem onClick={props.onUngroup}>Remove</MenuItem> */}
      </Menu>
    </React.Fragment>
  );
};

export default RowActionMenu;
