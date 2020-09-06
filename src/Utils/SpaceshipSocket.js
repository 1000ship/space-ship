import io from "socket.io-client";

export const EVENT_ENTER = "e";
export const EVENT_EXIT = "x";
export const EVENT_USER_LIST = "l";
export const EVENT_USER_MOVE = "m";
export const EVENT_USER_TALK = "t";

export default function SpaceshipSocket(
  host,
  port,
  { onConnect, onUserListChange, onUserMove, onUserTalk, userName }
) {
  this.socket = io(`http://${host}:${port}`);
  this.id = "";
  this.userList = [];
  this.userName = "";

  this.socket.on("connect", () => {
    console.log("ID", this.socket.id);
    this.socket.binary(true).emit(EVENT_ENTER, this.socket.id, userName);
    this.id = this.socket.id;
    onConnect(this.id);
  });

  this.socket.on(EVENT_ENTER, (id, name) => {
    // console.log("Enter", id, name);
    this.userList.push({ id, name });
    if (onUserListChange) onUserListChange(this.userList);
  });

  this.socket.on(EVENT_EXIT, (id) => {
    // console.log("Exit", id);
    const exitIndex = this.userList.findIndex((each) => each.id === id);
    if (exitIndex === -1) return;
    this.userList.splice(exitIndex, 1);
    if (onUserListChange) onUserListChange(this.userList);
  });

  this.socket.on(EVENT_USER_LIST, (list) => {
    this.userList = list;
    if (onUserListChange) onUserListChange(this.userList, true);
  });

  this.socket.on(EVENT_USER_MOVE, (id, x, y) => {
    if (onUserMove) onUserMove(id, x, y);
  });

  this.socket.on(EVENT_USER_TALK, (id, talk) => {
    if (onUserTalk) onUserTalk(id, talk);
  });
}
