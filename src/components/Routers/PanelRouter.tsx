import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import { LinkSharp } from '@mui/icons-material';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { IMenuList } from '@wms/interfaces';
import { useUI } from '@wms/hooks';
import { FontAwesomeIcon } from '@wms/components';

interface IMenuComponent {
  secondary: IMenuList,
  main: IMenuList,
  nav: NavigateFunction
}

const MenuComponent: React.FC<IMenuComponent> = ({ secondary, main, nav }) => (
  <React.Fragment>
    <Card key={uuid()} variant="elevation" className="w-72" elevation={3}>
      <CardActionArea onClick={() => nav(`${main.menuUrl}${secondary.menuUrl}`)} title="Get Link">
        <Box component="section" className="flex" >
          <CardMedia
            component="img"
            sx={{ height: 160, width: 70, bgcolor: 'white', }}
            // image="https://source.unsplash.com/random/300×300/?abstract-geometry"
            loading="eager"
            image="/img/svg/hexagon.svg"
            title="bg"
          />
          <Box component="article" className="flex flex-col justify-center">
            <CardContent sx={{ height: 120 }}>
              <Box component="section" className="flex flex-row items-center gap-2 ">
                <FontAwesomeIcon iconLabel={secondary.icon} size="lg" className="text-gray-600" />
                <Typography variant="h5" component="div" >
                  {secondary.menuName}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {secondary.description}
              </Typography>
            </CardContent>
            <Box component="section" className="flex flex-col items-start justify-center pl-4"><LinkSharp fontSize="small" color="info" /></Box>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  </React.Fragment>
);

const PanelRouter = () => {
  const { menu } = useUI();
  const location = useLocation();
  const navigate = useNavigate();
  const lastIndex = location.pathname.split('/').length - 1;
  const path = location.pathname.split('/')[lastIndex];

  const getMenuOption = (menu: IMenuList[]) => {
    return menu.map((item): any => {
      if (item.menuUrl.split('/').includes(path)) {
        return item.children?.map(subMenu => <MenuComponent key={uuid()} secondary={subMenu} main={item} nav={navigate} />);
      }
      return <React.Fragment key={uuid()} />;
    });
  };

  return (
    <Box component="div" className="">
      <Box component="div" className="flex flex-wrap justify-center gap-3 pt-4">
        {getMenuOption(menu.main)}
        {getMenuOption(menu.secondary)}
      </Box>
    </Box>
  );
};

export default PanelRouter;