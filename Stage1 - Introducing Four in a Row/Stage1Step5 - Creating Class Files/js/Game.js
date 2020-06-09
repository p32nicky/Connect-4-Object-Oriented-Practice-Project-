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
    const players = [new Player('Player 1', 1, '#e15258', true),
                    new Player('Player 2', 2, '#e59a13')];
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
}
