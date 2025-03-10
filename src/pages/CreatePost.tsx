import React, { use, useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box, TextareaAutosize } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { getUserName } from '../helper';
import { addPost, updatePost } from '../axiosApis/Apis';

const Background = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  background: '#F8F9FA',
  padding: '40px 0',
});

const FormContainer = styled(Paper)({
  padding: '24px',
  maxWidth: '600px',
  width: '100%',
  borderRadius: '12px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
});

const ButtonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '16px',
});

const CreatePost: React.FC<createPOstProps> = ({payload}) => {
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '' });
        const user=getUserName();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log('Post submitted:', post);
    try{
      if(payload){
        const data :any= {
          id:payload.id,
          title: post.title,
          description: post.content,
          user: user.email,
        };
        const response=await updatePost(data);
      }
      else{
      const data :any= {
        title: post.title,
        description: post.content,
        user: user.email,
      };
      const response=await addPost(data);
    }
    }
    catch(error){
      console.error('Error creating post:', error);
    }
    navigate('/');
  };
useEffect(() => {
    if (payload) {
setPost({title:payload?.title,content:payload?.description})    }
  }
  , []);
  return (
    <Background>
      <Container component="main" maxWidth="sm">
        <FormContainer>
          {!payload?<Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            Add Your Post
          </Typography>:<Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            Update Your Post
          </Typography>}
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Post Title"
              name="title"
              value={post.title}
              onChange={handleChange}
              required
            />
            <TextareaAutosize
          minRows={6}
    placeholder="Post Content"
    name="content"
    value={post.content}
    onChange={handleChange}
    style={{ width: '100%', padding: '16.5px 14px', fontSize: '16px', borderRadius: '4px', borderColor: '#c4c4c4' }}
    required
/>
            <ButtonContainer>
              <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>
                Cancel
              </Button>
              {payload?<Button type="submit" variant="contained" color="primary">
                Update
              </Button>:<Button type="submit" variant="contained" color="primary">
                Publish
              </Button>}
            </ButtonContainer>
          </form>
        </FormContainer>
      </Container>
    </Background>
  );
};
type createPOstProps = {
  payload?: any;
};
export default CreatePost;
