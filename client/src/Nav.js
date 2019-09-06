import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Icon } from "semantic-ui-react";

const Nav = () => {

  return (
    <Menu>
      <Menu.Item as={Link} to={"/projects"}>
        Projects
      </Menu.Item>
      <Menu.Item as={Link} to={"/actions"}>
        Actions
      </Menu.Item>
      {/* <Menu.Item as={Link} to={"/newproject"}>
          <Icon name='plus circle'/>
          New Post
      </Menu.Item> */}
    </Menu>
  );
};

export default Nav;
