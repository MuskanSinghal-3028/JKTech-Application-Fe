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
    window.location.assign(`${process.env.REACT_APP_API_URL}/auth/google`);
    } catch (error) {
      console.error('Google Sign-In failed', error);
    }
  };
useEffect(()=>{
  onGoogleSignIn()
},[])

  return (
    <Background>

    </Background>
  );
};

export default Login;
