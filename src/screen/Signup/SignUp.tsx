
import React from 'react';
import { useState } from 'react';

import {Avatar,Button,CssBaseline,TextField,Link,Grid,Box,Typography,Container,Snackbar,createTheme,ThemeProvider,AlertProps} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MuiAlert from '@mui/material/Alert';
import { register } from '../ db/database';
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
    ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

export default function SignUp() {

    const [err, setErr] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate()

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }
        setErr(false);
        setSuccess(false);
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const uname = data.get('email') as string;
    const pass = data.get('password' ) as string;
    if(pass == null || uname === null )
    {
      setErr(true);
      return
    }
    if(await register(uname,pass))
    {
      setSuccess(true);
      localStorage.setItem('newuser', 'true');
      navigate('/')
    }
    else
    {
      setErr(true);
      return
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
        <Snackbar open={err} autoHideDuration={1500} onClose={handleCloseSnackbar} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Incorrect email
        </Alert>

        </Snackbar>
        <Snackbar open={success} autoHideDuration={1500} onClose={handleCloseSnackbar} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
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