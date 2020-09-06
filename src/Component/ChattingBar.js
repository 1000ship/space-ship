import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  background-color: white;
`;
const TextInput = styled.input`
  font-size: 1em;
  width: 100%;
`;

const SendButton = styled.div`
  padding: 20px;
  background-color: lightblue;
`;

const ChattingBar = (props )=> {
  return <Container>
    <TextInput type='text'/>
    <SendButton>전송</SendButton>
  </Container>
}

export default ChattingBar;