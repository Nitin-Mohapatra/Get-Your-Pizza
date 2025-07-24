import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
import OptionsMenu from './OptionsMenu';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem("LoggedIn") === "true");
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.9rem',
          fontWeight: 600,
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
          fontFamily:'ketchup',
        }}
      >
        Get Your Pizza
      </Box>

      <Divider />

      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuContent />

        <CardAlert />

      </Box>


      <Divider />
      {isLoggedIn && (
        <Stack
          direction="row"
          sx={{
            p: 2,
            gap: 1,
            alignItems: 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Avatar
            sizes="small"
            alt="Riley Carter"
            
            sx={{ width: 36, height: 36 }}
          >{localStorage.getItem("adminName").charAt(0).toLocaleUpperCase()}</Avatar>

          <Box sx={{ mr: 'auto' , overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
              {localStorage.getItem("adminName") || ""}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {localStorage.getItem("adminEmail") || ""}
            </Typography>
          </Box>

          <OptionsMenu/>

        </Stack>
      )}

    </Drawer>
  );
}