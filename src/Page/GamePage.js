import React from "react";
import styled from "styled-components";
import WannavileMap from "../Resource/Map/wannavile.jpg";
import Character from "../Component/Character";
import FloatingMenu from "../Component/FloatingMenu";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Canvas = styled.svg`
  width: 100vw;
  height: 100vh;
`;

const Stage = styled.g``;

const BackgroundImage = styled.image`
  position: absolute;
  left: 0;
  top: 0;
  width: 1500px;
`;

const GamePage = (props) => {
  const { moveTo, myUser, userList, talk } = props;

  const onBackgroundClick = (e) => {
    moveTo(e.pageX, e.pageY);
  };

  return (
    <Container
      onMove>
      <Canvas>
        <Stage>
          <BackgroundImage
            xlinkHref={WannavileMap}
            onClick={onBackgroundClick}
          ></BackgroundImage>
          {userList.map((user) => (
            <Character key={user.id} {...user}></Character>
          ))}
          <Character key={myUser.id} {...myUser}></Character>
        </Stage>
      </Canvas>
      <FloatingMenu talk={talk}></FloatingMenu>
    </Container>
  );
};

export default GamePage;
