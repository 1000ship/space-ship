import React from "react";
import styled from "styled-components";
import GhostCharacter from "../Resource/Character/ghost.png";

const Container = styled.g`
  transition: transform 1s;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: ${({x,y}) => `translate(${x}px, ${y}px)`} translate(-75px, -150px);
  /* animation-iteration-count: infinite;
  animation-duration: 1s;
  animation-name: ghost-animation;

  @keyframes ghost-animation {
    0% {
      transform: translate(-50%, -90%);
    }
    50% {
      transform: translate(-50%, -95%);
    }
    100% {
      transform: translate(-50%, -90%);
    }
  } */
`;

const CharacterImage = styled.image`
  width: 150px;
  height: 150px;
  /* object-fit: contain;
  object-position: center; */
`;
const CharacterName = styled.text`
  fill: #000000;
  font-size: 1.5em;
  white-space: nowrap;
`;

const TalkBox = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  font-size: 1.5em;
  transform: translate(-50%, -110%);
`;

const TalkContent = styled.div`
  color: black;
  background-color: white;
  border-radius: 10px;
  padding: 5px 10px;
  max-width: 100%;
`;

const Character = (props) => {
  const { name, x, y, message } = props;

  return (
    <Container x={x} y={y}>
      <CharacterImage xlinkHref={GhostCharacter}></CharacterImage>
      <CharacterName x={0} y={180}>{name}</CharacterName>
      {message && (
        <TalkBox>
          <TalkContent>{message}</TalkContent>
        </TalkBox>
      )}
    </Container>
  );
};

export default Character;
