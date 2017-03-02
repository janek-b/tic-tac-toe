// Back-End
function Board() {
  this.grid = [];
  for (var x = 0; x < 3; x++) {
    this.grid[x] = [];
    for (var y = 0; y < 3; y++) {
      this.grid[x][y] = 0;
    };
  };
  this.player1 = new Player("X")
  this.player2 = new Player("O")
};

function Player(mark) {
  this.mark = mark;
}


var testboard = new Board();
console.log(testboard);
// Front-End
$(function() {


})
