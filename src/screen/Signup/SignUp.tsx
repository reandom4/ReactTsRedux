
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
import { useState } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
    ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


export default function SignUp() {
    
    const [, setError] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [sucopen, setsucOpen] = useState(false);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const uname = data.get('email');
    const pass = data.get('password')
    if (!isValidEmail(uname as string))
    {
        setError(true);
        setOpen(true);
        return
    }
        fetch('http://158.160.131.136:3001/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: uname, password: pass}),
          })
            .then((response) => response.json())
            .catch(error => {console.error('Ошибка при добавлении пользователя:', error);
            setError(true);
            setOpen(true);
        })
        setsucOpen(true);
  };

  function isValidEmail(email: string| null) {
    if (email === null) {
        return false;
    }
    return /\S+@\S+\.\S+/.test(email);
  }


  return (
    <ThemeProvider theme={defaultTheme}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Incorrect email
        </Alert>

        </Snackbar>
        <Snackbar open={sucopen} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
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
            Sign up
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
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}