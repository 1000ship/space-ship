import io from "socket.io-client";

export default function SpaceshipSocket(host, port, {
  onUserListChange, onUserMove
}) {
  this.socket = io(`http://${host}:${port}`);
  this.id = ""
  this.userList = [];

  this.emit = (eventName, ...args) => {
    this.socket.emit(eventName, ...args)
  }

  this.socket.on("connect", () => {
    console.log("ID", this.socket.id);
    this.socket.emit("enter", this.socket.id);
    this.id = this.socket.id;
  });

  this.socket.on("enter", (id) => {
    console.log("Enter", id);
    this.userList.push(id);
    if(onUserListChange) onUserListChange(this.userList)
  });

  this.socket.on("exit", (id) => {
    console.log("Exit", id);
    const exitIndex = this.userList.findIndex(
      (each) => each.id === this.socket.id
    );
    this.userList.splice(exitIndex, 1);
    if(onUserListChange) onUserListChange(this.userList)
  });

  this.socket.on("user-list", (list) => {
    this.userList = list;
    if(onUserListChange) onUserListChange(this.userList)
  });

  this.socket.on("user-move", (id, x,y) => {
    if(onUserMove) onUserMove(id, x, y)
  })
}
