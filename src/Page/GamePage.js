import React from "react";
import styled from "styled-components";
import WannavileMap from "../Resource/Map/wannavile.jpg";
import Character from "../Component/Character";
import FloatingMenu from "../Component/FloatingMenu";

const Container = styled.div`
  position:fixed;
  width: 100vw;
  height: 100vh;

`;

const BackgroundImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
`;

const GamePage = (props) => {
  const { moveTo, myUser, userList, talk } = props;

  const onBackgroundClick = (e) => {
    moveTo( e.pageX, e.pageY )
  }

  return (
    <Container>
      <BackgroundImage src={WannavileMap} onClick={onBackgroundClick}></BackgroundImage>
      {userList.map((user) => (
        <Character key={user.id} {...user}>
        </Character>
      ))}
      <Character key={myUser.id} {...myUser} >
      </Character>
      <FloatingMenu talk={talk}></FloatingMenu>
    </Container>
  );
};

export default GamePage;
