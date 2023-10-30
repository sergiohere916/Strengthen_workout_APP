import React from "react";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';


import { createTheme, ThemeProvider } from '@mui/material/styles';

function NavBar() {

    const history = useHistory()

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
        .then(history.push("/"))
      }

    return (
        <ThemeProvider theme={theme}>
        <Box id="navbar" sx={{ flexGrow: 1}}>
            <AppBar elevation={15} position="static" color="primary" sx={{height: "200px", position: "relative;"}}>
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
                    <button onClick={handleClick}>LOG OUT</button>
                </Toolbar>
                    <Box sx={{bgcolor: 'secondary.main', position: "absolute;", right: "0px", bottom: "0px", width: "20%", height: "30%", justifyContent: "center", display: "flex"}}>
                        {/* <NavLink to = "/Home"><button>HOME</button></NavLink>
                        <NavLink to = "/Workouts"><button>WORKOUTS</button></NavLink>
                        <NavLink to = "/Routines"><button>ROUTINES</button></NavLink> */}
                        <Stack direction="row" spacing={2}>
                          <Button color = "error" variant="contained" href="/Home">HOME</Button>
                          <Button color = "error" variant="contained" href="/Workouts">Excercises</Button>
                          <Button color = "error" variant="contained" href="/routines">
                            Routines
                          </Button>
                        </Stack>
                    </Box>
            </AppBar>
        </Box>
        </ThemeProvider>
    )
}

export default NavBar