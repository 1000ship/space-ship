import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  right: 10px;
  top: 10px;
`;

const Button = styled.button`
  padding: 20px;
  font-size: 1.5em;
`;

const FloatingMenu = (props) => {
  const { talk } = props;

  const onTalkClick = (e) => {
    const message = prompt("할 말은?");
    if (message) talk(message);
  };

  return (
    <Container>
      <Button onClick={onTalkClick}>대화하기</Button>
    </Container>
  );
};
export default FloatingMenu;
