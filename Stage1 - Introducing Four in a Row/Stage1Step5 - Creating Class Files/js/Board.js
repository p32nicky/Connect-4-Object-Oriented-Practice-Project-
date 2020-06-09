class Board {
  constructor (){
    this.rows = 6;
    this.columns = 7;
    this.spaces = this.createspaces();
  }

  /*Generates a 2d array of spaces
  @return {array} an array of space objects
  */
createSpaces(){
  const spaces = [];
  for(i = 0; i < this.columns; i++){
    const column = [];

    for(j = 0; j < this.rows; j++){
      const space = new Space(x, y);
      spaces.push(space);
    }

    spaces.push(column);

  }
  return spaces;

}
