import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link,Grid,Box,Typography,Container,Checkbox,FormControlLabel,TextField,CssBaseline,Avatar,Button,Snackbar} from '@mui/material';

import {login} from '../ db/database'

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function SignIn() {
    
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    
    const [success, setSuccess] = useState(false);
    console.log(success)
    

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }
    setOpen(false);
    localStorage.setItem('newuser', 'false');
    };

  const loginbutton = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const uname = data.get('email');
    const pass = data.get('password')
    if(await login(uname as string, pass as string))
    {
      navigate('/Cake')
    }
    else
    {
      setOpen(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
        <Alert onClose={handleCloseSnackbar} severity="error"  sx={{ width: '100%' }}>
          Incorrect login or password
        </Alert>
      </Snackbar>

      <Snackbar open={success} autoHideDuration={2000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Success
        </Alert>
      </Snackbar>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={loginbutton} noValidate sx={{ mt: 1 }}>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/registration" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}