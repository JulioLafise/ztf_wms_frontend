import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  SizeProp,
  IconProp,
  IconName,
  IconPrefix,
  RotateProp,
  FlipProp,
  // IconStyle,
  // IconFamily,
  library,
} from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Load icons pack
library.add(fas, far, fab);

interface Props {
  icon?: IconProp,
  iconLabel?: string,
  prefix?: IconPrefix
  // type?: IconStyle,
  // family?: IconFamily,
  className?: string,
  size?: SizeProp,
  color?: string,
  style?: React.CSSProperties,
  rotation?: RotateProp,
  flip?: FlipProp,
  beat?: boolean,
  fade?: boolean,
  beatFade?: boolean,
  bounce?: boolean,
  shake?: boolean,
  spin?: boolean,
  spinReverse?: boolean,
  spinPulse?: boolean,
}

const FontAwesomeIcon = (props: Props) => {
  const {
    className,
    // type,
    // family,
    icon,
    iconLabel,
    prefix,
    size,
    color,
    style,
    rotation,
    flip,
    beat,
    fade,
    beatFade,
    bounce,
    shake,
    spin,
    spinReverse,
    spinPulse,
  } = props;
  const iconName = iconLabel as IconName;
  return (
    <Icon
      icon={icon || { iconName, prefix: prefix || 'fas' }}
      color={color}
      className={className}
      size={size}
      style={style}
      rotation={rotation}
      flip={flip}
      beat={beat}
      fade={fade}
      beatFade={beatFade}
      bounce={bounce}
      shake={shake}
      spin={spin}
      spinReverse={spinReverse}
      spinPulse={spinPulse}
    />
  );
};

export default FontAwesomeIcon;