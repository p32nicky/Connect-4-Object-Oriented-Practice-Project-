class Board {
  constructor (){
    this.rows = 6;
    this.columns = 7;
    this.spaces = this.createSpaces();
  }

  /*Generates a 2d array of spaces
  @return {array} an array of space objects
  */
  createSpaces(){
    const spaces = [];
    for(var x = 0; x < this.columns; x++){
      const column = [];

      for(var y = 0; y < this.rows; y++){
        const space = new Space(x, y);
        spaces.push(space);
      }

      spaces.push(column);

    }
    return spaces;

  }

  drawHTMLBoard(){
    for(let column of this.spaces){
      for(let space of column){
        space.drawSVGSpace();
      }
    }
  }

}
