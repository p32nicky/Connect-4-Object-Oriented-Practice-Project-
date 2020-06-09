class Game {
  constructor (board, players, ready){
    this.board = new Board();
    this.players = this.createPlayers();
    this.ready = false;
    }
  createPlayers(){
    const players = [new Player("Player One", 1, '#e15258', true),
                    new Player("Player Two", 2, '#e59a13')];
    return players;

  }

  startGame(){

    
  }
}
