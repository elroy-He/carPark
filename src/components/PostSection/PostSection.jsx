
import React from 'react';
import { Card  } from 'semantic-ui-react'
import PostCard from '../PostCard/PostCard';


export default function PostFeed({posts, numPhotosCol, user, isProfile, addLike, removeLike }){

    return (

        <Card.Group itemsPerRow={numPhotosCol} stackable>
        {posts.reverse().map((post) => {
            const add = post.address.split(' ').join('+');
          return (
            <PostCard
              post={post}
              key={post._id}
              isProfile={isProfile}
              user={user}
              addLike={addLike}
              removeLike={removeLike}
              add={add}
            />
          );
        })}
      </Card.Group>

    )
}