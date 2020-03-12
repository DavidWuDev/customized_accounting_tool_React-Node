import { Header } from '@app/components';
import { Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  addButtonLink: {
    color: 'inherit',
  },
});

interface IProps {
  name: string;
  pluralName?: string;
  title: string;
  pluralTitle?: string;
  allowAdd?: boolean;
}

const DataViewHeader: React.FC<IProps> = (props) => {
  const { name, title, pluralTitle } = props;
  const classes = useStyles(props);

  return (
    <Header
      title={pluralTitle || `${title}s`}
      drawerMenu
      rightComponent={props.allowAdd && (
        <Link to={`/${name}/add`} className={classes.addButtonLink}>
          <Header.IconButton>
            <Tooltip title={`Add new ${title.toLowerCase()}`}>
              <AddIcon />
            </Tooltip>
          </Header.IconButton>
        </Link>
      )}
    />
  );
};

export default DataViewHeader;
