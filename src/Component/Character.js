import React from "react";
import styled from "styled-components";
import GhostCharacter from "../Resource/Character/ghost.png";

const Container = styled.div`
  position: absolute;
  left: ${({x})=>x}px;
  top: ${({y})=>y}px;
  transition left 1s, top 1s;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -90%);
  animation-iteration-count: infinite;
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
  }
`;

const CharacterImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  object-position: center;
`;
const CharacterName = styled.span`
  color: white;
  font-size: 1.5em;
`;

const Character = (props) => {
  const {username, x, y} = props;
  return <Container x={x} y={y}>
    <CharacterImage src={GhostCharacter}></CharacterImage>
    <CharacterName>{username}</CharacterName>
  </Container>;
};

export default Character;