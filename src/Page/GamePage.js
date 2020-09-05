import React from "react";
import styled from "styled-components";
import WannavileMap from "../Resource/Map/wannavile.jpg";
import Character from "../Component/Character";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const BackgroundImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 1500px;
`;

const GamePage = (props) => {
  const { moveTo, myUser, userList } = props;

  const onBackgroundClick = (e) => {
    moveTo( e.pageX, e.pageY )
  }

  return (
    <Container>
      <BackgroundImage src={WannavileMap} onClick={onBackgroundClick}></BackgroundImage>
      {userList.map((user) => (
        <Character key={user.id} x={user.x} y={user.y} username={user.name}>
        </Character>
      ))}
      <Character key={myUser.id} x={myUser.x} y={myUser.y} username={myUser.name}>
      </Character>
    </Container>
  );
};

export default GamePage;
