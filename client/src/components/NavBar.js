import React from "react";


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { createTheme, ThemeProvider } from '@mui/material/styles';

function NavBar() {
    const theme = createTheme({
        palette: {
          primary: {
            main: '#212121', 
          },
          secondary: {
            main: '#78909c',
          }
        },
      });

      //TEMPORARY WAY OF LOGGING OUT USING ROUTINES BUTTON MUST MAKE ACTUAL LOGOUT BUTTON
      function handleClick() {
        fetch("/logout", {
            method: "DELETE",
        })
        .then(alert("logged out"))
      }

    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static" color="primary" sx={{height: "200px", position: "relative;"}}>
                <Toolbar>
                    <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    News
                    </Typography>
                    
                </Toolbar>
                    <Box sx={{bgcolor: 'secondary.main', position: "absolute;", right: "0px", bottom: "0px", width: "20%", height: "30%", justifyContent: "center"}}>
                        <Button  color="inherit">Home</Button>
                        <Button  color="inherit">Workouts</Button>
                        <Button onClick={handleClick} color="inherit">Routines</Button>
                    </Box>
            </AppBar>
        </Box>
        </ThemeProvider>
    )
}

export default NavBar