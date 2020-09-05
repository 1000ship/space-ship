import React, { useState, useEffect } from "react";
import { throttle } from "./Utils/utility";
import GamePage from "./Page/GamePage";
import SpaceshipAPI from "./Utils/SpaceshipAPI";
import SpaceshipUser from "./Utils/SpaceshipUser";
import { EVENT_USER_MOVE } from "./Utils/SpaceshipSocket";

function App() {
  const [myUser, setMyUser] = useState( new SpaceshipUser("", "") );
  const [userList, setUserList] = useState([]);

  useEffect( () => {
    SpaceshipAPI.setUsername( prompt("당신의 이름은?", "바보"))
    SpaceshipAPI.setUserListCallback((userList) => {
      setUserList(userList)
    });
    SpaceshipAPI.setUserMeCallback((userMe) => {
      setMyUser({...userMe})
    });
    SpaceshipAPI.connect()
  }, [])

  const moveTo = throttle((x, y) => {
    SpaceshipAPI.emit(EVENT_USER_MOVE, x, y);
  }, 100);

  return (
    <GamePage
      moveTo={moveTo}
      myUser={myUser}
      userList={userList}
    ></GamePage>
  );
}

export default App;
