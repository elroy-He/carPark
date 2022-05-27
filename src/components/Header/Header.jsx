import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon, Dropdown } from "semantic-ui-react";

export default function PageHeader({ user, handleLogout }) {
    console.log(user, 'user in header')
  return (
    <Segment clearing>
      <Header as="h2" floated="right">
        <Link to="/">
          <Icon name="home"></Icon>
        </Link>
        <Link to="" onClick={handleLogout}>
          Logout
        </Link>
      </Header>
      <Header as="h2" floated="left">
        <Link to={`/${user?.username}`}>
          <Image
            src={
              user?.photoUrl
                ? user?.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
            avatar
          ></Image>
        </Link>
        <Dropdown item>
                    <Dropdown.Menu>
                        <Dropdown.Item><Link to='/' className="drop-link">Feed</Link></Dropdown.Item>
                        <Dropdown.Item><Link to='' onClick={handleLogout} className="drop-link">Logout</Link></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
      </Header>
    </Segment>
  );
}