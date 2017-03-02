// Back-End
function Board(ctx, width, height) {
  this.ctx = ctx;
  this.width = width;
  this.height = height;
  this.cellWidth = this.width/3;
  this.cellHeight = this.height/3;
  this.grid = [];
  for (var x = 0; x < 3; x++) {
    this.grid[x] = [];
    for (var y = 0; y < 3; y++) {
      this.grid[x][y] = "";
    };
  };
  this.player1 = new Player("X")
  this.player2 = new Player("O")
  this.turn = 1;
};

Board.prototype.draw = function() {

  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      if (this.grid[x][y] === "X") {
        //draw x
      } else if (this.grid[x][y] === "O") {
        // draw o
      }
    }
  }


  for (var x = this.cellWidth; x < this.width; x = x+this.cellWidth) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, this.height);
    ctx.stroke();
  }
  for (var y = this.cellHeight; y < this.height; y = y+this.cellHeight) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(this.width, y);
    ctx.stroke();
  }
}

Board.prototype.setMark = function(x, y) {
  if (this.grid[x][y] === "") {
    if (this.turn % 2 === 0) {
      this.grid[x][y] = this.player2.mark;
      this.turn ++;
    } else if (this.turn % 2 != 0) {
      this.grid[x][y] = this.player1.mark;
      this.turn ++;
    };
    return this.checkGame();
  };
};

Board.prototype.checkGame = function() {
  var result = "";
  if (this.turn > 9) {
    result = "draw"
  } else {
    for (var x = 0; x < 3; x++) {
      if (this.grid[x][0] === this.grid[x][1] && this.grid[x][1] === this.grid[x][2]) {
        result = this.grid[x][0];
      };
    };
    for (var y = 0; y < 3; y++) {
      if (this.grid[0][y] === this.grid[1][y] && this.grid[1][y] === this.grid[2][y]) {
        result = this.grid[0][y];
      };
    };
    if (this.grid[0][0] === this.grid[1][1] && this.grid[1][1] === this.grid[2][2]) {
      result = this.grid[0][0];
    };
    if (this.grid[0][2] === this.grid[1][1] && this.grid[1][1] === this.grid[2][0]) {
      result = this.grid[0][2];
    };
  };
  return result;
};

function Player(mark) {
  this.mark = mark;
}


var testboard = new Board();

// Front-End
$(function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  canvas.addEventListener("mousedown", getPos, false);

  var gameBoard = new Board(ctx, canvas.width, canvas.height);

  function getPos(event) {
    var rect = canvas.getBoundingClientRect();
    var x = Math.floor((event.clientX - rect.left)/gameBoard.cellWidth);
    var y = Math.floor((event.clientY - rect.top)/gameBoard.cellHeight);
    console.log(x, y);
  }








  // console.log(cellWidth);

})
