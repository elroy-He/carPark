import React, { useState, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PageHeader from '../../components/Header/Header';
import AddPost from '../../components/AddPostForm/AddPostForm';
import PostFeed from '../../components/PostSection/PostSection';
import * as postsAPI from '../../utils/postApi';
import {  Grid } from 'semantic-ui-react';

export default function FeedPage({user}) {

  const [posts, setPosts] = useState([])
  const [error, setError] = useState("");

  async function handleAddPost (post){

    const data = await postsAPI.create(post);
    console.log(data.post, ' This is new pup', data, ' data variable')
    setPosts([data.post, ...posts]);
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
        <PageHeader user={user}/>
        <ErrorMessage error={error} />;
      </>
    );
  }

  return(
    <>
      <Grid centered >
        <Grid.Row>
          <Grid.Column>
            <PageHeader/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 900 }}>
            <AddPost handleAddPost={handleAddPost}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column style={{maxWidth: 900}}>
          <PostFeed posts={posts}  numPhotosCol={2}  />
        </Grid.Column>
        </Grid.Row>
    </Grid>
    </>
  )
}