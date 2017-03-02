// Back-End
function Board() {
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
  var width = canvas.width;
  var height = canvas.height;
  var cellWidth = width/3;
  var cellHeight = height/3;
  // ctx.lineWidth = 10;

  canvas.addEventListener("mousedown", getPos, false);

  function getPos(event) {
    var rect = canvas.getBoundingClientRect();
    var x = Math.floor((event.clientX - rect.left)/cellWidth);
    var y = Math.floor((event.clientY - rect.top)/cellHeight);
    console.log(x, y);
  }

  for (var x = cellWidth; x < width; x = x+cellWidth) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (var y = cellHeight; y < height; y = y+cellHeight) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }




  // console.log(cellWidth);

})
