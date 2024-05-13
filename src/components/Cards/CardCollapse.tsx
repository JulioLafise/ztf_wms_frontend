import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  IconButton,
  SxProps,
  Tooltip,
  Typography
} from '@mui/material';
import { InfoRounded } from '@mui/icons-material';


interface  ICardActionButtonProps<T> {
  children: React.ReactNode,
  values: T,
  button?: 'card' | 'button' | 'none',
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>,
  onClick?: (cardData: T, setExpanded: React.Dispatch<React.SetStateAction<boolean>>) => void,
  AdditionalActionButtons?: (cardData: T) => React.ReactNode | React.ReactNode
} 

const CardActionButton = <T, >(props: ICardActionButtonProps<T>) => {

  const buttonComponent = (data: ICardActionButtonProps<T>) => {
    switch (data.button) {
      case 'card':
        return (
          <CardActionArea className="h-[100%]" title="More Info" onClick={() => { data.onClick && data.onClick(data.values, data.setExpanded); }}>
            {data.children}
          </CardActionArea>
        );

      case 'button':
        return (
          <React.Fragment>
            {data.children}
            <CardActions className="flex items-start">
              <Tooltip title="More Info">
                <IconButton onClick={() => { data.onClick && data.onClick(data.values, data.setExpanded); }}>
                  <InfoRounded />
                </IconButton>
              </Tooltip>
              {
                data.AdditionalActionButtons && (
                  data.AdditionalActionButtons(data.values)
                )
              }
            </CardActions>
          </React.Fragment>
        );
    
      default:
        return (
          <React.Fragment>
            {data.children}
          </React.Fragment>
        );
    }
  };

  return buttonComponent(props);
};

interface IProps<T> {
  data: DataType<T>,
  variant?: 'elevation' | 'outlined',
  sx?: SxProps,
  className?: string,
  header?: TypeHeader<T>,
  image?: TypeImage,
  direction?: 'horizontal' | 'vertical',  
  button?: 'card' | 'button' | 'none',
  onClick?: (cardData: T, setExpanded: React.Dispatch<React.SetStateAction<boolean>>) => void,
  AdditionalActionButtons?: (cardData: T) => React.ReactNode | React.ReactNode
}

type DataType<T> = {
  title: string,
  titleSecondary?: string,
  subtitle?: string,
  body: string,
  CollapseComponent?: React.ReactNode | React.ReactNode[],
  collapseDirection?: 'horizontal' | 'vertical',
  collapseHeight?: React.CSSProperties['height'],
  optionData: T
};

type TypeHeader<T> = {
  avatar?: React.ReactNode,
  action?: (cardData: T) => React.ReactNode | React.ReactNode,
  title: string,
  subheader?: string
}

type TypeImage = {
  url: string
  title: string,
  sx?: SxProps
}

const CardCollapse = <T, >(props: IProps<T>) => {
  const {
    data,
    sx,
    className,
    variant,
    header,
    image,
    button = 'none',
    direction = 'vertical',
    onClick,
    AdditionalActionButtons
  } = props;
  const [expanded, setExpanded] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <Card sx={sx} variant={variant} className={className} elevation={2}>
        <CardActionButton
          button={button}
          values={data.optionData}
          setExpanded={setExpanded}
          AdditionalActionButtons={AdditionalActionButtons}
          onClick={onClick}
        >
          <Box
            component="div"
            display="flex"
            flexDirection={data.collapseDirection === 'horizontal' ? 'row' : 'column'}
            className="h-[100%]"

          >
            {
              header && (
                <CardHeader
                  className="w-full"
                  avatar={header.avatar}
                  action={header.action && header.action(data.optionData)}
                  title={header.title}
                  subheader={header.subheader}
                />
              )
            }
            <Box component="section" display="flex" flexDirection={direction === 'horizontal' ? 'row' : 'column'} className="w-full">
              {
                image && (
                  <CardMedia
                    component="img"
                    loading="eager"
                    sx={image.sx}
                    image={image.url}
                    title={image.title}
                  />
                )
              }
              <Box component="article" className="flex flex-col justify-center">
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {data.titleSecondary}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {data.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {data.subtitle}
                  </Typography>
                  {data.body && (<Divider variant="fullWidth" />)}
                  <Typography variant="body2" color="text.secondary" className="break-all pt-2">
                    {data.body.slice(0, 305)}...
                  </Typography>
                </CardContent>
              </Box>
            </Box>
            <Collapse in={expanded} timeout="auto" orientation={data.collapseDirection} unmountOnExit>
              <CardContent className="overflow-auto container-scroll" sx={{ height: data.collapseHeight }}>
                {data.CollapseComponent}
              </CardContent>
            </Collapse>
          </Box>
        </CardActionButton>
      </Card>
    </React.Fragment>
  );
};


export default CardCollapse;