import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActionArea, Pagination, Box, Button, Fab } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { getAllPosts } from '../axiosApis/Apis';
import { getUserName } from '../helper';
import moment from 'moment-timezone';

const Background = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  background: '#F8F9FA',
  padding: '40px 0',
});

const DashboardContainer = styled(Container)({
  maxWidth: '900px',
});

const PostCard = styled(Card)({
  borderRadius: '12px',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 6px 15px rgba(0,0,0,0.1)',
  },
});

const PaginationContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
});

const FabContainer = styled(Box)({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
});

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(5);

  const [offset, setOffset] = useState(0);

  const [posts, setPosts] = useState([]);
  const user=getUserName();

  useEffect(() => {
    const getPosts = async () => {
      try {

        const response :any= await getAllPosts(limit, offset,user?.email);
         setPosts(response?.data?.data);
         setTotal(response?.data?.total);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosts();
  }, [limit,offset]);

  // Get posts for the current page
  const indexOfLastPost = page * limit;
  const indexOfFirstPost = indexOfLastPost - limit;

  return (
    <Background>
      <DashboardContainer>
        {/* Top Create Post Button */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">
            My Posts
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/create-post')}>
            Create Post
          </Button>
        </Box>

        <Grid container spacing={3}>
          {posts.map((post:any) => (
            <Grid item xs={12} key={post?.id}>
              <PostCard>
                <CardActionArea onClick={() => navigate(`/post/${post.id}`)}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {post?.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
                      {post.description.substring(0, 100)} ...
                    </Typography>
                    
                    <Typography variant="caption" color="textSecondary">

Updated at: {moment(Number(post?.updated_at)).tz('Asia/Kolkata').format('DD/MM/YYYY hh:mm A')}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </PostCard>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <PaginationContainer>
          <Pagination 
            count={Math.ceil(total / limit)} 
            page={page} 
            onChange={(_, value) => {
              setPage(value);
              setOffset((value - 1) * limit);
            }}
            color="primary" 
          />
        </PaginationContainer>

        {/* Floating Action Button */}
        <FabContainer>
          <Fab color="primary" aria-label="create" onClick={() => navigate('/create-post')}>
            <AddIcon />
          </Fab>
        </FabContainer>
      </DashboardContainer>
    </Background>
  );
};

export default Dashboard;
