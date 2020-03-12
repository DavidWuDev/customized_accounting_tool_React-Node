import { PropTypes as MUIPropTypes } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

export interface IProps {
  title: string;
  children?: any;
  layoutRef?: (ref: any) => void;
  headerProps: {
    leftComponent?: React.ReactNode;
    rightComponent?: React.ReactNode;
    color?: MUIPropTypes.Color;
    style?: React.CSSProperties;
  };
}

export interface IPropsExtended {
  classes?: any;
  width?: Breakpoint;
}

export interface IState {
  redirect: string;
  drawerOpen: boolean;
  mini: boolean;
}
