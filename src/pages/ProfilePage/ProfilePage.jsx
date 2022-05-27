

import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import PageHeader from "../../components/Header/Header";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostFeed from "../../components/PostSection/PostSection";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import userService from "../../utils/userService";

import { useParams } from "react-router-dom";

export default function ProfilePage(props) {

  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const { username } = useParams();
  const [loading, setLoading] = useState(true);

  async function getProfile() {
    try {
      const data = await userService.getProfile(username);
      console.log(data, " < -- data");
      setUser(() => data.user);
      setPosts(() => data.posts);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Profile Doesn't exists, CHECK YOUR TERMINAL FOR EXPRESS!");
    }
  }
  useEffect(() => {
    getProfile();
  }, []);




  if (error) {
    return (
      <>
        <PageHeader handleLogout={props.handleLogout} user={props.user}/>
        <ErrorMessage error={error} />;
      </>
    );
  }

  if (loading) {
    return(
      <h1> The page is loading </h1>
    )
  }

  return (
    <>
      <Grid centered >
        <Grid.Row>
          <Grid.Column>
            <PageHeader/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column>
            <ProfileBio user={props.user}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column style={{maxWidth: 900}}>
          <PostFeed numPhotosCol={3} user={props.user} posts={posts} isProfile={true}/>
        </Grid.Column>
        </Grid.Row>
    </Grid>
    </>
  )
}