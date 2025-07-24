import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MenuButton from './MenuButton';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
import AdminInfo from './AdminInfo';
import { useNavigate } from 'react-router-dom';

function SideMenuMobile({ open, toggleDrawer }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem("LoggedIn") === "true");
  const navigator = useNavigate();
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
        },
      }}
    >

      {isLoggedIn && (
        <Stack
          sx={{
            maxWidth: '70dvw',
            height: '100%',
          }}
        >
          <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
            <Stack
              direction="row"
              sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
            >
             
              <Typography component="p" variant="h6">
                {localStorage.getItem("adminName")}
              </Typography>
            </Stack>
            
          </Stack>
          <Divider />
          <Stack sx={{ flexGrow: 1 }}>
            <MenuContent />
            <Divider />
          </Stack>
          
          {/* <CardAlert /> */}
          <Stack sx={{ p: 2 }}>
            <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />} onClick={() => {
              localStorage.removeItem("LoggedIn");
              localStorage.removeItem("token");
              localStorage.removeItem("adminId");
              setIsLoggedIn(false);
              navigator('/admin/login');

            }}>
              Logout
            </Button>
          </Stack>
        </Stack>  
      )}



    </Drawer>
  );
}

SideMenuMobile.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideMenuMobile;
