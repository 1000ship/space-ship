import React, { useState, useEffect } from "react";
import { throttle, makeRandomName } from "./Utils/utility";
import GamePage from "./Page/GamePage";
import SpaceshipAPI from "./Utils/SpaceshipAPI";
import SpaceshipUser from "./Utils/SpaceshipUser";
import { EVENT_USER_MOVE, EVENT_USER_TALK } from "./Utils/SpaceshipSocket";
import BGMPlayer from "./Utils/BGMPlayer";

function App() {
  const [myUser, setMyUser] = useState(new SpaceshipUser("", ""));
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    SpaceshipAPI.setUsername(prompt("당신의 이름은?", makeRandomName()));
    SpaceshipAPI.setUserListCallback((userList) => {
      setUserList([...userList]);
    });
    SpaceshipAPI.setUserMeCallback((userMe) => {
      setMyUser({ ...userMe });
    });
    SpaceshipAPI.connect();
    window.addEventListener("click", () => {
      if (!BGMPlayer.isPlaying()) BGMPlayer.play();
    });
  }, []);

  const moveTo = throttle((x, y) => {
    SpaceshipAPI.emit(EVENT_USER_MOVE, x, y);
  }, 100);

  const talk = (message) => {
    SpaceshipAPI.emit(EVENT_USER_TALK, message);
  };

  return (
    <GamePage
      moveTo={moveTo}
      talk={talk}
      myUser={myUser}
      userList={userList}
    ></GamePage>
  );
}

export default App;
