import { Header } from '@app/components';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVertOutlined';
import React, { useState } from 'react';

interface IProps {
  actions: Array<{
    label: string;
    action: () => void;
    icon?: React.ReactElement;
    disabled?: boolean;
    visible?: boolean;
  }>;
}

const MoreMenu: React.FC<IProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAction = (action: () => void) => {
    setAnchorEl(null);

    if (action) {
      action();
    }
  };

  return (
    <React.Fragment>
      <Header.IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreIcon />
      </Header.IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(false)}
      >
        {props.actions.filter(x => x.visible !== false).map((item, index) => (
          <MenuItem key={String(index)} onClick={() => handleAction(item.action)} disabled={item.disabled}>
            {Boolean(item.icon) && (
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
            )}
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

export default MoreMenu;
