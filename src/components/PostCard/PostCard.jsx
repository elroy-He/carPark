import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import Iframe from 'react-iframe'

function PostCard({post, isProfile, addLike, removeLike, user, add}) {
  const likeIndex = post.likes.findIndex(
    (like) => like.username === user.username
  );

  const clickHandler =
    likeIndex > -1
      ? () => removeLike(post.likes[likeIndex]._id)
      : () => addLike(post._id);

  // if the logged users id exists, the heart should be red, because the logged in user has liked the post
  // and the clicked handler should removeLike
  const likeColor = likeIndex > -1 ? "red" : "grey";

  return (
    <>
    <Card key={post._id} raised>
    {isProfile ? (
      ""
    ) : (
      <Card.Content textAlign="left">
        <Card.Header>
          <Link to={`/${post.user.username}`}>
            <Image
              size="large"
              avatar
              src={
                post.user.photoUrl
                  ? post.user.photoUrl
                  : "https://react.semantic-ui.com/images/wireframe/square-image.png"
              }
            />
            {post.user.username}
          </Link>
        </Card.Header>
      </Card.Content>
    )}


      <Image src={`${post.photoUrl}`} wrapped ui={false} />
      <Card.Content>
      <Card.Description>
        Experience summary: {post.description}
      </Card.Description>
      <Card.Description>
        Parking lot address: {post.address}
      </Card.Description>
      </Card.Content>
      <Card.Content extra textAlign={'right'}>
        <Icon name={'heart'} size='large' color={likeColor}
        onClick={clickHandler} />
        {post.likes.length} Likes

      </Card.Content>
    </Card>

    <Iframe
      width="450"
      height="250"
      frameborder="0" style="border:0"
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBI0EA4b2AFBSQHxvm1jTIUQwPLm3-vNYI&q=${add}`}
      allowfullscreen />
      </>
  );
}

export default PostCard;