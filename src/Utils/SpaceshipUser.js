function SpaceshipUser(id, name) {
  this.id = id
  this.name = name
  this.x = 0
  this.y = 0
  this.setPosition = (x, y) => {
    this.x = x;
    this.y = y;
    return this
  }
  this.clone = () => {
    return {
      ...this
    }
  }
}

export default SpaceshipUser;
