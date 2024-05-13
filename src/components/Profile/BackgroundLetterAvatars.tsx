import { Avatar, AvatarProps, SxProps, Theme } from '@mui/material';
import AvatarBadge from './AvatarBadge';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string, sx?: SxProps<Theme>) {
  const onSpacesName = (values: string) => {
    return values.includes(' ') ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : values.slice(0,1);
  };
  return {
    sx: {
      bgcolor: stringToColor(name),
      color: theme => theme.palette.primary.contrastText,
      ...sx
    } as SxProps<Theme>,
    children: `${onSpacesName(name)}`,
  };
}

const BackgroundLetterAvatars = (props: AvatarProps) => {
  const { alt = '', sx, ...restProps } = props;
  return (<AvatarBadge><Avatar {...stringAvatar(alt, sx)} {...restProps} /></AvatarBadge>);
};

export default BackgroundLetterAvatars;