import * as React from 'react';
import {useState, useRef, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { login_api } from '../../actions/authentification';
import Alt from '../layouts/alert';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/otmanLAHRECHE">
         EPSP Djanet Pharm_Up V1.0 
      </Link>{' '}-- created by otman LAHRECHE 
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {

  const [loged, setLoged] = useState(false)
  const [alert, setAlert] = useState(false)
  const [error_email, setErrorEmail] = useState([])
  const [error_password, setErrorPassword] = useState([])

  const [open, setOpen] = useState(false)


  

  const handleSubmit = async (event) => {
    
    setErrorEmail([false,""])
    setErrorPassword([false,""])
    setAlert(false)
    setOpen(true)

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var email = data.get("email")
    var password = data.get("password")
    var login_state = await login_api(email, password);
  
    
    if (login_state == "logged"){
        console.log("logged it is");
            setTimeout(()=>{
              console.log("timeout....")
              setLoged(true)
            }, 2000)
    }else {
      setOpen(false)

    var validation_password = JSON.parse(login_state).password
    var validation_email = JSON.parse(login_state).email


    if (validation_email){
        
      console.log(validation_email[0])
    }
    if (validation_password){
        
      console.log(validation_password[0])
    }

      setAlert(true)
      if (validation_email[0]){
        setErrorEmail([true,validation_email[0]])
      }
      if (validation_password[0]){
        setErrorPassword([true,validation_password[0]])
      }
    }


  };

  if (localStorage.getItem("auth_token") && loged == true) {
    console.log("navigate")
    return <Navigate to="/"/>;
  }else{
  return (
    <>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://img.freepik.com/premium-photo/pharmacist-holding-medicine-box-capsule-pack-pharmacy-drugstore_67340-24.jpg?w=996)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Pharm_Up authentification
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                error = {error_email[0]}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                helperText={error_email[1]}
              />
              <TextField
                error = {error_password[0]}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText = {error_password[1]}
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
                Log in
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>



            {alert ? <Alt type='error' message='Authentification error !!' /> : null}
            {loged ? <Alt type='success' message='Wilcome to PHARM_UP' /> : null}

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>


    

    </>
  );
}
}