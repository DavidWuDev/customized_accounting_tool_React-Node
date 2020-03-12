import Button, { ButtonProps } from '@material-ui/core/Button';
import React from 'react';

interface IProps {
  leftMargin?: boolean;
  rightMargin?: boolean;
}

const ActionButton: React.FC<ButtonProps & IProps> = (props) => {
  const { children, style, ...rest } = props;
  const extendStyle: any = {};

  if (props.leftMargin) {
    extendStyle.marginLeft = 12;
  }
  if (props.rightMargin) {
    extendStyle.marginRight = 12;
  }

  return (
    <Button style={{ ...extendStyle, ...style }} {...rest}>
      {children}
    </Button>
  );
};

export default ActionButton;
