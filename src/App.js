import React, { useState, useEffect } from "react";
import SpaceshipSocket from "./Utils/SpaceshipSocket";
import styled from "styled-components";
import { throttle } from "./Utils/utility";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const UserMouse = styled.div`
  position: fixed;
  left: ${({x}) => x}px;
  top: ${({y}) => y}px;
  background: red;
`;

var socket;

function App() {
  const [userState, setUserState] = useState([]);

  useEffect(() => {
    socket = new SpaceshipSocket("localhost", 4000, {
      onUserListChange,
      onUserMove,
    });
  }, []);

  const onUserListChange = (list) => {
    setUserState(list.map((id) => ({ id, x: 0, y: 0 })));
  };

  const onUserMove = (id, x, y) => {
    console.log( id, x, y )
    setUserState((userState) => {
      const who = userState.findIndex((each) => each.id === id);
      const result = [...userState];
      if (who === -1) return result;
      result[who].x = x;
      result[who].y = y;
      return result;
    });
  };

  const moveTo = throttle((x, y) => {
    socket.emit("user-move", x, y);
  }, 50);

  return (
    <Container onMouseMove={(e) => moveTo(e.pageX, e.pageY)}>
      {userState.map((user) => (
        <UserMouse key={user.id} x={user.x} y={user.y}>
          {user.id}
        </UserMouse>
      ))}
    </Container>
  );
}

export default App;
