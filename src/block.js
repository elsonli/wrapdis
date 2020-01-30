class Block {
  constructor(pos) {
    this.pos = pos;
    this.filled = true;
  }

  toggleOff() {
    this.filled = false;
  }
}

export default Block;