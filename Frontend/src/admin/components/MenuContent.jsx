import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import SimpleDialogDemo from "./SimpleDialogDemo";
import { useState } from 'react';

const mainListItems = [
  { text: 'Menu Management', icon: <AnalyticsRoundedIcon sx={{fontSize:1 , padding:12}}/> },
  { text: 'User Management', icon: <PeopleRoundedIcon fontSize='small'/> },
  { text: 'Token Management', icon: <AssignmentRoundedIcon fontSize='small'/> },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
];


export default function MenuContent() {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>

      <List dense>

          <ListItemButton onClick={() => setOpenDialog(true)}>
              <ListItemIcon><AnalyticsRoundedIcon sx={{fontSize:'2em', color:"grey" , paddingRight:0.5}}/></ListItemIcon>
              <ListItemText primary={"Menu Management"} />
          </ListItemButton>

          <ListItemButton >
              <ListItemIcon><HomeRoundedIcon sx={{fontSize:'2em', color:"grey" , paddingRight:0.5}} /></ListItemIcon>
              <ListItemText primary={"Orders"} />
          </ListItemButton>

          <ListItemButton >
              <ListItemIcon><PeopleRoundedIcon sx={{fontSize:'2em', color:"grey" , paddingRight:0.5}}/> </ListItemIcon>
              <ListItemText primary={"User Management"} />
          </ListItemButton>

          <ListItemButton >
              <ListItemIcon><AssignmentRoundedIcon sx={{fontSize:'2em', color:"grey" , paddingRight:0.5}}/></ListItemIcon>
              <ListItemText primary={"Token Management"} />
          </ListItemButton>
      </List>

      {/* Secondary Items */}
      {/* <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}

      {/* Dialog PopUP */}
      <SimpleDialogDemo openPopUp={openDialog} closeDb = {setOpenDialog}/>

    </Stack>
  );
}