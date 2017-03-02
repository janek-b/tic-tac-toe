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
  this.ctx.lineWidth = 10;
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      if (this.grid[x][y] === "X") {
        this.ctx.beginPath();
        this.ctx.moveTo(x*this.cellWidth + this.cellWidth/5, y*this.cellHeight + this.cellHeight/5)
        this.ctx.lineTo(x*this.cellWidth + this.cellWidth - this.cellWidth/5, y*this.cellHeight + this.cellHeight - this.cellHeight/5)
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(x*this.cellWidth + this.cellWidth - this.cellWidth/5, y*this.cellHeight + this.cellHeight/5)
        this.ctx.lineTo(x*this.cellWidth + this.cellWidth/5, y*this.cellHeight + this.cellHeight - this.cellHeight/5)
        this.ctx.stroke();
      } else if (this.grid[x][y] === "O") {
        this.ctx.beginPath();
        this.ctx.arc(x*this.cellWidth + this.cellWidth/2, y*this.cellHeight + this.cellHeight/2, (this.cellWidth * (1.5/5)), 0,2*Math.PI);
        this.ctx.stroke();
      };
    };
  };
  for (var x = this.cellWidth; x < this.width; x = x+this.cellWidth) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, 0);
    this.ctx.lineTo(x, this.height);
    this.ctx.stroke();
  };
  for (var y = this.cellHeight; y < this.height; y = y+this.cellHeight) {
    this.ctx.beginPath();
    this.ctx.moveTo(0, y);
    this.ctx.lineTo(this.width, y);
    this.ctx.stroke();
  };
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
    this.draw();
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
        if (this.grid[x][0] != "") {
          result = this.grid[x][0];
        };
      };
    };
    for (var y = 0; y < 3; y++) {
      if (this.grid[0][y] === this.grid[1][y] && this.grid[1][y] === this.grid[2][y]) {
        if (this.grid[0][y] != "") {
          result = this.grid[0][y];
        };
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
};

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
    gameBoard.setMark(x, y);
  };

  gameBoard.draw();
  var startGame = setInterval(autoRun, 100);

  function autoRun() {
    var endGame = gameBoard.checkGame();
    console.log(endGame);
    if (endGame === "X") {
      alert("X won")
      clearInterval(startGame);
    } else if (endGame === "O") {
      alert("O won")
      clearInterval(startGame);
    } else if (endGame === "draw") {
      alert("cats game")
      clearInterval(startGame);
    };
  };
});
