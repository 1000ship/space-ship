import SpaceshipUser from "./SpaceshipUser";
import SpaceshipSocket from "./SpaceshipSocket";

const SOCKET_HOST = "ec2-3-137-150-69.us-east-2.compute.amazonaws.com";
// const SOCKET_HOST = "localhost";
const SOCKET_PORT = 4000;

const onConnect = (id) => {
  userMe.id = id;
};

const onUserListChange = (list, withPosition = false) => {
  const result = [...userList].filter((each) => {
    const where = list.findIndex(({ id }) => id === each.id);
    return where !== -1;
  });
  list.forEach(({ id, name, x = 0, y = 0 }) => {
    const where = result.findIndex((each) => each.id === id);
    if (where === -1 && id !== socket.id) {
      const user = new SpaceshipUser(id, name);
      if (withPosition) user.setPosition(x, y);
      result.push(user);
    }
  });
  userList = result;
  userListCallback(userList);
};

const onUserMove = (id, x, y) => {
  if (userMe.id === id) {
    userMe.setPosition(x, y);
    userMeCallback(userMe);
    return;
  }
  const who = userList.findIndex((each) => each.id === id);
  const result = [...userList];
  if (who === -1) return result;
  result[who].x = x;
  result[who].y = y;
  userList = result;
  userListCallback(userList);
};

const onUserTalk = (id, message) => {
  if (userMe.id === id) {
    userMe.talk(message, () => userMeCallback(userMe));
    userMeCallback(userMe);
    return;
  }
  const who = userList.findIndex((each) => each.id === id);
  if (who === -1) return;
  userList[who].talk(message, () => userListCallback(userList));
  userListCallback(userList);
};

var socketController;
var socket;

export var userMe = new SpaceshipUser();
export var userList = [];
var userListCallback = null;
var userMeCallback = null;

const SpaceshipAPI = {
  emit: (eventName, ...args) => {
    if (socket) socket.binary(true).emit(eventName, ...args);
  },
  setUserListCallback: (func) => {
    userListCallback = func;
  },
  setUserMeCallback: (func) => {
    userMeCallback = func;
  },
  setUsername: (name) => {
    userMe.name = name;
  },
  connect: () => {
    socketController = new SpaceshipSocket(SOCKET_HOST, SOCKET_PORT, {
      onConnect,
      onUserListChange,
      onUserMove,
      onUserTalk,
      userName: userMe.name,
    });
    socket = socketController.socket;
  },
};

export default SpaceshipAPI;
