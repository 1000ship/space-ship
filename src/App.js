import React, { useState, useEffect, useRef } from "react";
import SpaceshipSocket from "./Utils/SpaceshipSocket";
import styled from "styled-components";
import { throttle } from "./Utils/utility";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const UserMouse = styled.div`
  position: fixed;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
`;

var socket;

function App() {
  const [myPosition, setMyPosition] = useState({x:0, y:0})
  const [userState, setUserState] = useState([]);

  useEffect(() => {
    socket = new SpaceshipSocket(
      "ec2-3-137-150-69.us-east-2.compute.amazonaws.com",
      4000,
      {
        onUserListChange,
        onUserMove,
      }
    );
  }, []);

  const onUserListChange = (list) => {
    setUserState((userState) => {
      const result = [...userState].filter((each) => {
        const where = list.findIndex((id) => id === each.id);
        return where !== -1;
      });
      list.forEach((id) => {
        const where = result.findIndex((each) => each.id === id);
        if (where === -1 && id !== socket.id) result.push({ id, x: 0, y: 0 });
      });
      return result;
    });
  };

  const onUserMove = (id, x, y) => {
    if (id === socket.id)
    {
      setMyPosition({x,y})
    }
    else
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
  }, 100);

  return (
    <Container onMouseMove={(e) => moveTo(e.pageX, e.pageY)}>
      <UserMouse x={myPosition.x} y={myPosition.y}>
        ME
      </UserMouse>
      {userState.map((user) => (
        <UserMouse key={user.id} x={user.x} y={user.y}>
          {user.id}
        </UserMouse>
      ))}
    </Container>
  );
}

export default App;
