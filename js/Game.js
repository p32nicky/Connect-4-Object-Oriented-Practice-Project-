class Game {
  constructor (board, players, ready){
    this.board = new Board();
    this.players = this.createPlayers();
    this.ready = false;
    }

    get activePlayer(){
      return this.players.find(player => player.active);
    }

  createPlayers(){
    const players = [new Player('Player 1', 1, '#FF0000', true),
                    new Player('Player 2', 2, '#0000FF')];
    return players;
  }
/*
Gets Game Ready For Players
*/
  startGame(){
    /**
     * Initializes game.
     */
     this.board.drawHTMLBoard();
     this.activePlayer.activeToken.drawHTMLToken();
     this.ready = true;
  }

  handleKeydown(event){
    if (this.ready){
        if(event.key === "ArrowLeft"){
          this.activePlayer.activeToken.moveLeft();
        }
        else if (event.key === "ArrowRight"){
          this.activePlayer.activeToken.moveRight(this.board.columns);
        }
        else if (event.key === "ArrowDown"){
          this.playToken();
        }
    }
  }
  playToken(){
     let spaces = this.board.spaces;
     let activeToken = this.activePlayer.activeToken;
     let targetColumn = spaces[activeToken.columnLocation];
     let targetSpace = null;

     for (let space of targetColumn) {
       if (space.token === null) {
         targetSpace = space;
       }
     }

     if (targetSpace !== null) {
       game.ready = false;
       activeToken.drop(targetSpace, function(){
                game.updateGameState(activeToken, targetSpace);
    		});
        }
    }


    /**
     * Updates game state after token is dropped.
     * @param   {Object}    token - The token that's being dropped.
     * @param   {Object}    target - Targeted space for dropped token.
     */
    updateGameState(token, target) {
		target.mark(token);

        if (!this.checkForWin(target)) {
            console.log('no win');
			this.switchPlayers();

            if (this.activePlayer.checkTokens) {
                this.activePlayer.activeToken.drawHTMLToken();
                this.ready = true;
            } else {
                this.gameOver('No more tokens');
            }
        } else {
			console.log('win');
            this.gameOver(`${target.owner.name} wins!`)
        }
    }


    /**
     * Checks if there a winner on the board after each token drop.
     * @param   {Object}    target - Targeted space for dropped token.
     * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
     */
    checkForWin(target){
    	const owner = target.token.owner;
    	let win = false;
		console.log('checkforwin called');
    	// vertical
    	for (let x = 0; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
				console.log(x,y);
				console.log(y+1);
				console.log(y+2);
				console.log(y+3);
                if (this.board.spaces[x][y].owner === owner &&
    				this.board.spaces[x][y+1].owner === owner &&
    				this.board.spaces[x][y+2].owner === owner &&
    				this.board.spaces[x][y+3].owner === owner) {
                    	win = true;
						console.log(win);
                }
            }
        }

    	// horizontal
    	for (let x = 0; x < this.board.columns - 3; x++ ){
            for (let y = 0; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner &&
    				this.board.spaces[x+1][y].owner === owner &&
    				this.board.spaces[x+2][y].owner === owner &&
    				this.board.spaces[x+3][y].owner === owner) {
                    	win = true;
                }
            }
        }

    	// diagonal
    	for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner &&
    				this.board.spaces[x-1][y+1].owner === owner &&
    				this.board.spaces[x-2][y+2].owner === owner &&
    				this.board.spaces[x-3][y+3].owner === owner) {
                    	win = true;
                }
            }
        }

    	// diagonal
    	for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 3; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner &&
    				this.board.spaces[x-1][y-1].owner === owner &&
    				this.board.spaces[x-2][y-2].owner === owner &&
    				this.board.spaces[x-3][y-3].owner === owner) {
                    	win = true;
                }
            }
        }

    	return win;
    }


    /**
     * Switches active player.
     */
	switchPlayers() {
		for (let player of this.players) {
			player.active = player.active === true ? false : true;
		}
    }


    /**
     * Displays winner info.
     * @param   {String}    message - Game over message.
     */
    gameOver(message) {
		document.getElementById('game-over').style.display = 'block';
        document.getElementById('game-over').textContent = message;
    }

    updateGameState(token, target) {
		target.mark(token);

        if (!this.checkForWin(target)) {
            console.log('no win');
			this.switchPlayers();

            if (this.activePlayer.checkTokens()) {
                this.activePlayer.activeToken.drawHTMLToken();
                this.ready = true;
            } else {
                this.gameOver('No more tokens');
            }
        } else {
			console.log('win');
            this.gameOver(`${target.owner.name} wins!`)
        }
    }
}
