import { Divider, Theme } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BankAccountIcon from '@material-ui/icons/AccountBalanceOutlined';
import BusinessIcon from '@material-ui/icons/BusinessOutlined';
import CategoryIcon from '@material-ui/icons/CategoryOutlined';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import RuleIcon from '@material-ui/icons/FlagOutlined';
import TemplateIcon from '@material-ui/icons/FormatPaintOutlined';
import ImportExportIcon from '@material-ui/icons/ImportExportOutlined';
import PersonIcon from '@material-ui/icons/PersonOutline';
import TransactionIcon from '@material-ui/icons/ViewAgendaOutlined';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { RouteChildrenProps, withRouter } from 'react-router';
import { NavLink, NavLinkProps } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    marginRight: theme.spacing(),
  },
  activeNavLink: {
    backgroundColor: '#e8f0fe !important',
    color: theme.palette.primary.main,
    '& .MuiListItemIcon-root': {
      color: 'inherit',
    },
  },
  linkText: {
    fontWeight: 500,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  listItem: {
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
  },
  divider: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
  },
}));

const items = [{
  title: 'Dashboard',
  path: '/',
  icon: <DashboardIcon />,
}, {
  title: 'Transactions',
  path: '/transactions',
  icon: <TransactionIcon />,
}, {
  title: 'Import statement',
  path: '/import-statement',
  icon: <ImportExportIcon />,
}, {
  divider: true,
}, {
  title: 'Persons',
  path: '/persons',
  icon: <PersonIcon />,
  childPaths: ['/person/:id', '/person/add', '/person/edit/:id'],
}, {
  title: 'Banks',
  path: '/banks',
  icon: <BusinessIcon />,
  childPaths: ['/bank/:id', '/bank/add', '/bank/edit/:id'],
}, {
  title: 'Bank accounts',
  path: '/bank-accounts',
  icon: <BankAccountIcon />,
  childPaths: ['/bank-account/:id', '/bank-account/add', '/bank-account/edit/:id'],
}, {
  title: 'Statement templates',
  path: '/statement-templates',
  icon: <TemplateIcon />,
  childPaths: ['/statement-template/:id', '/statement-template/add', '/statement-template/edit/:id'],
}, {
  title: 'Categories',
  path: '/categories',
  icon: <CategoryIcon />,
  childPaths: ['/category/:id', '/category/add', '/category/edit/:id'],
}, {
  title: 'Rules',
  path: '/rules',
  icon: <RuleIcon />,
  childPaths: ['/rule/:id', '/rule/add', '/rule/edit/:id'],
}];

const isActive = (matchPath: string, path: string, childPaths: string[]) => {
  if (!childPaths || !childPaths.length) {
    return null;
  }

  return () => [path, ...childPaths].indexOf(matchPath) !== -1;
};

const ForwardNavLink = React.forwardRef((props: NavLinkProps, ref: React.RefObject<HTMLAnchorElement>) => (
  <NavLink {...props} innerRef={ref} />
));

const DrawerItems: React.FC<RouteChildrenProps> = (props) => {
  const classes = useStyles(props);

  return (
    <List className={classes.root}>
      {items.map((item, index) => item.divider ? <Divider key={String(index)} className={classes.divider} /> : (
        <ListItem
          key={String(index)}
          button
          component={ForwardNavLink}
          to={item.path}
          exact
          activeClassName={classes.activeNavLink}
          isActive={isActive(props.match.path, item.path, item.childPaths)}
          classes={{ root: classes.listItem }}
        >
          {Boolean(item.icon) && (
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
          )}
          <ListItemText primary={item.title} classes={{ primary: classes.linkText }} />
        </ListItem>
      ))}
    </List>
  );
};

export default withRouter(DrawerItems);
