import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { FlexDirectionProperty, OverflowBlockProperty } from 'csstype';
import React from 'react';

type ScrollViewClassKey = 'root' | 'horizontal';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column' as FlexDirectionProperty,
    flex: 1,
    overflowY: 'auto' as OverflowBlockProperty,
    overflowX: 'hidden' as OverflowBlockProperty,
  },
  horizontal: {
    flexDirection: 'row' as FlexDirectionProperty,
    overflowY: 'hidden' as OverflowBlockProperty,
    overflowX: 'auto' as OverflowBlockProperty,
  },
};

interface IProps {
  horizontal?: boolean;
  style?: any;
}

interface IStyleProps {
  classes: {
    [key in ScrollViewClassKey]: string;
  };
}

const ScrollView: React.FC<IProps & IStyleProps> = (props) => {
  const classes = props.classes;
  return (
    <div
      className={classNames(classes.root, {
        [classes.horizontal]: props.horizontal,
      })}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default withStyles(styles)(ScrollView) as React.FC<IProps>;
