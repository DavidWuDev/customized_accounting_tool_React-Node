import { StyleRules, withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { FlexDirectionProperty } from 'csstype';
import React from 'react';

type ViewClassKey = 'root'
  | 'flexGrow' 
  | 'alignItemCenter'
  | 'justifyContentCenter'
  | 'justifyContentEnd'
  ;

const styles: StyleRules<any, any> = {
  root: {
    display: 'flex',
    flexDirection: 'column' as FlexDirectionProperty,
    overflow: 'hidden',
  },
  flexGrow: {
    flex: 1,
  },
  alignItemCenter: {
    alignItems: 'center',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  justifyContentEnd: {
    justifyContent: 'flex-end',
  },
};

const alignItemClassMap = {
  center: 'alignItemCenter',
};

const justifyContentClassMap = {
  center: 'justifyContentCenter',
  end: 'justifyContentEnd',
};

interface IProps {
  flexGrow?: boolean;
  flexDirection?: FlexDirectionProperty;
  style?: React.CSSProperties;
  className?: string;
  alignItems?: 'center';
  justifyContent?: 'center' | 'end';
  divRef?: any;
}

interface IStyleProps {
  classes: {
    [key in ViewClassKey]: string;
  };
}

const View: React.FC<IProps & IStyleProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { classes, className, style, flexGrow, flexDirection, alignItems, justifyContent, children, divRef, ...rest } = props;
  const viewStyles: React.CSSProperties = {};

  if (flexDirection) {
    viewStyles.flexDirection = flexDirection;
  }

  return (
    <div
      className={classNames(classes.root, {
        [classes.flexGrow]: flexGrow,
      },
        classes[alignItemClassMap[alignItems]],
        classes[justifyContentClassMap[justifyContent]],
        className,
      )}
      style={{ ...style, ...viewStyles }}
      ref={divRef}
      {...rest}
    >
      {children}
    </div>
  );
};

export default withStyles(styles)(View) as React.FC<IProps>;
