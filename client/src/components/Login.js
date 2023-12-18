import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Login({onLogIn}) {


    const history = useHistory()
    const defaultTheme = createTheme();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target[0].value
        const password = event.target[2].value
        const userLogin = {
            email: email,
            password: password
        }
        fetch('/login', {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(userLogin)
        })
        .then(r => {
            if (r.ok) {
                r.json()
                .then(verifiedUserLogin => {
                    onLogIn(verifiedUserLogin)
                    history.push("/Home")
                })
            } else {
                alert("Login Failed. Incorrect Username or Password. Please try again.")
            }
        }) 
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar style = {{backgroundColor: "rgb(255, 102, 0)"}}sx={{ m: 1}}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    />
                    {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    /> */}
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    color = "error"
                    >
                    Sign In
                    </Button>
                    <Grid container>
                    <Grid item xs>
                     
                    </Grid>
                    <Grid item>
                        <Link href="/createAccount" variant="body2">
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
                </Box>
                
            </Container>
        </ThemeProvider>
    )
}

export default Login