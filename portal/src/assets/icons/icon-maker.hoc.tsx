import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

const IconMaker = (C: React.FunctionComponent<React.SVGProps<SVGSVGElement>>): React.FC<SvgIconProps> => (props) => {
  return <SvgIcon {...props}><C /></SvgIcon>;
};

export default IconMaker;
