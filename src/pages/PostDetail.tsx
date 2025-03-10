import React, { use, useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { deletePost, getPostById } from '../axiosApis/Apis';
import moment from 'moment-timezone';
import CreatePost from './CreatePost';

const Background = styled('div')({
  minHeight: '85vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  
//   background: '#F8F9FA',
});

const Banner = styled('div')({
  width: '100%',
  height: '250px',
  background: 'linear-gradient(135deg,rgb(211, 213, 215),rgb(204, 232, 237))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  textAlign: 'center',
  padding: '20px',
});

const PostContainer = styled(Paper)({
  padding: '32px',
  maxWidth: '900px',
  width: '90%',
  borderRadius: '16px',
  boxShadow: '0px 10px 24px rgba(0, 0, 0, 0.12)',
  background: 'white',
  marginTop: '-80px',
  position: 'relative',
});

const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
});



const PostDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [post, setPost] = useState({created_at:'',description:'',title:'',id:0});  
  const [showCreatePost, setShowCreatePost] = useState(false);
  const handleDelete = () => {
    setOpenDialog(true);
  };
const getPost = async () => {
    try {
      if (id) {
        const response = await getPostById(parseInt(id));
        setPost(response.data.data);
      } else {
        console.error('Error: id is undefined');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  }
  const confirmDelete = async(id:number) => {
    console.log('Post deleted:', id);
    try{
    await deletePost(id);
    navigate('/');}
    catch(error){
      console.error('Error deleting post:', error);
    }
  };
  const handleEdit = () => {
    setShowCreatePost(true);
  };
useEffect(() => { getPost();
}
, []);
  return (
    <Background>
      {showCreatePost ? (
        <CreatePost payload={post}/>
      ) : (
        <>
          {Object.keys(post)?.length > 0 && (
            <Banner>
              <Typography variant="h3" fontWeight="bold">{post.title}</Typography>
            </Banner>
          )}
          {Object.keys(post)?.length > 0 && (
            <Container component="main">
              <PostContainer>
                <Header>
                  <Typography variant="body2" color="textSecondary">
                    Created at: {moment(Number(post?.created_at)).tz('Asia/Kolkata').format('DD/MM/YYYY hh:mm A')}
                  </Typography>
                  <Box>
                    <IconButton color="primary" onClick={handleEdit}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={handleDelete}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Header>
                <Typography variant="body1" sx={{ marginBottom: 3, lineHeight: 1.8 }}>
                  {post.description}
                </Typography>
              </PostContainer>
            </Container>
          )}
          {Object.keys(post)?.length > 0 && (
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WarningAmberIcon color="error" /> Confirm Deletion
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this post? This action cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="secondary">
                  Cancel
                </Button>
                <Button onClick={()=>{confirmDelete(post?.id)}} color="error" variant="contained">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </>
      )}
    </Background>
  );
};

export default PostDetail;
