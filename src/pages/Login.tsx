import React, { use, useEffect } from 'react';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/system';
import { Google as GoogleIcon } from '@mui/icons-material';
import { authenticateGoogle } from '../axiosApis/Apis'; // Import the API function
import { useNavigate } from 'react-router-dom';

const Background = styled(Box)({
  height: '89vh', // Full viewport height
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
   backgroundImage: `linear-gradient(to bottom, rgba(230, 241, 241, 0.7), rgba(239, 212, 153, 0.7)), url('https://source.unsplash.com/random/1920x1080?abstract')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  paddingTop: '70px', // Adjust based on header height
  boxSizing: 'border-box',
});

const FormContainer = styled(Paper)({
  padding: '32px',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
  borderRadius: '12px',
  height: 'fit-content',
  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
});

const StyledButton = styled(Button)({
  marginTop: '16px',
});

const Login: React.FC = () => {
    const navigate=useNavigate();
  
  const onGoogleSignIn = async () => {
    try {
    //   const response = await authenticateGoogle();
    window.location.assign(`${process.env.REACT_APP_API_URL}/auth/google`);

    //   const token = response.data.token;
    //    localStorage.setItem('access_token', token);
      // Handle successful login (e.g., redirect to another page)
    } catch (error) {
      console.error('Google Sign-In failed', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <Background>
      <FormContainer elevation={3}>
        <Typography component="h1" variant="h5" gutterBottom>
          Login
        </Typography>
        <form noValidate>
          <TextField
            variant="outlined"
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
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <StyledButton type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </StyledButton>
          <StyledButton fullWidth variant="contained" color="secondary" startIcon={<GoogleIcon />} onClick={onGoogleSignIn}>
            Sign In with Google
          </StyledButton>
        </form>
      </FormContainer>
    </Background>
  );
};

export default Login;
