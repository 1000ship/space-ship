function SpaceshipUser(id = "", name = "") {
  this.id = id;
  this.name = name;
  this.x = 0;
  this.y = 0;
  this.message = null;
  this.messageTimeout = null;
  this.setPosition = (x, y) => {
    this.x = x;
    this.y = y;
    return this;
  };
  this.clone = () => {
    return {
      ...this,
    };
  };
  this.talk = (message, callback) => {
    this.message = message;
    if (this.messageTimeout) clearTimeout(this.messageTimeout);
    this.messageTimeout = setTimeout(() => {
      this.message = null;
      callback();
    }, 3000);
  };
}

export default SpaceshipUser;
