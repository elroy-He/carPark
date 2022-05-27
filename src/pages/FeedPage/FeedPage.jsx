import React, { useState, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PageHeader from '../../components/Header/Header';
import AddPost from '../../components/AddPostForm/AddPostForm';
import PostFeed from '../../components/PostSection/PostSection';
import * as postsAPI from '../../utils/postApi';
import * as likesAPI from '../../utils/likeApi';
import {  Grid } from 'semantic-ui-react';

export default function FeedPage({user, handleLogout}) {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  async function addLike(postId) {
    try {
      const data = await likesAPI.create(postId)
      console.log(data, ' <- the response from the server when we make a like');
      getPosts(); // <- to go get the updated posts with the like
    } catch(err){
      console.log(err)
      setError(err.message)
    }
  }

  async function removeLike(likeId){
    try {
      const data = await likesAPI.removeLike(likeId);
      console.log(data, '<-  this is the response from the server when we remove a like')
      getPosts()

    } catch(err){
      console.log(err);
      setError(err.message);
    }
  }

  async function handleAddPost (post){

    const data = await postsAPI.create(post);
    console.log(data.post, ' This is new pup', data, ' data variable')
    setPosts([data.post, ...posts]);
    setLoading(false);
  }

  async function getPosts() {
    try {
      const data = await postsAPI.getAll();
      console.log(data, " this is data,");
      setPosts([...data.posts]);
      //setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setError(err.message);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);


  if (error) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} user={user}/>
        <ErrorMessage error={error} />;
      </>
    );
  }

  return(
    < div style={{
      backgroundColor: 'rgba(2,169,244,0.7'}}>
      <Grid centered >
        <Grid.Row>
          <Grid.Column>
            <PageHeader handleLogout={handleLogout} user={user}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 900 }}>
            <AddPost handleAddPost={handleAddPost}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column style={{maxWidth: 900}}>
          <PostFeed
            posts={posts}
            numPhotosCol={2}
            isProfile={false}
            loading={loading}
            addLike={addLike}
            user={user}
            removeLike={removeLike}/>
        </Grid.Column>
        </Grid.Row>
    </Grid>
    </div>
  )
}