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

Board.prototype.resetBoard = function() {
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      this.grid[x][y] = "";
    };
  };
  this.turn = 1;
  this.ctx.clearRect(0, 0, this.width, this.height);
}

Board.prototype.animateLine = function(x, y) {
  var line1StartX = x*this.cellWidth + this.cellWidth/5;
  var line1StartY = y*this.cellHeight + this.cellHeight/5;
  var line1EndX = x*this.cellWidth + this.cellWidth - this.cellWidth/5;
  var line1EndY = y*this.cellHeight + this.cellHeight - this.cellHeight/5;
  var line2StartX = x*this.cellWidth + this.cellWidth - this.cellWidth/5;
  var line2StartY = y*this.cellHeight + this.cellHeight/5;
  var line2EndX = x*this.cellWidth + this.cellWidth/5;
  var line2EndY = y*this.cellHeight + this.cellHeight - this.cellHeight/5;
  var amount = 0;
  var c = this.ctx;
  var lineInt = setInterval(function() {
    amount += 0.05;
    if (amount > 1) {
      amount = 1;
      clearInterval(lineInt);
    };
    c.clearRect(0, 0, this.width, this.height);
    c.moveTo(line1StartX, line1StartY);
    c.lineTo(line1StartX + (line1EndX - line1StartX)*amount, line1StartY + (line1EndY - line1StartY)*amount);
    c.stroke();
    c.moveTo(line2StartX, line2StartY);
    c.lineTo(line2StartX + (line2EndX - line2StartX)*amount, line2StartY + (line2EndY - line2StartY)*amount);
    c.stroke();
  }, 20);
};


Board.prototype.animateCircle = function(x, y) {
  var amount = 0;
  var c = this.ctx;
  var centerX = x*this.cellWidth + this.cellWidth/2;
  var centerY = y*this.cellHeight + this.cellHeight/2;
  var radius = (this.cellWidth * (1.5/5));
  var circleInt = setInterval(function() {
    amount += 0.05;
    if (amount > 1) {
      amount = 1;
      clearInterval(circleInt);
    };
    c.clearRect(0, 0, this.width, this.height);
    c.beginPath();
    c.arc(centerX, centerY, radius, 0, (2*Math.PI)*amount);
    c.stroke();
  }, 20);
};

Board.prototype.draw = function() {
  this.ctx.lineWidth = 10;
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      if (this.grid[x][y] === "X") {
        this.animateLine(x, y);
      } else if (this.grid[x][y] === "O") {
        this.animateCircle(x, y);
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
  };
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
  return result;
};

Board.prototype.dumbComp = function() {
  var x = Math.floor(Math.random()*3);
  var y = Math.floor(Math.random()*3);
  if (this.grid[x][y] === "") {
    this.setMark(x, y);
  } else {
    this.dumbComp();
  };
};

Board.prototype.oCount = function() {
  var count = 0;
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      if (this.grid[x][y] === "X") {
        count ++;
      }
    }
  }
  return count;
}

Board.prototype.checkDiagonal = function(mark) {
  for (var x = 0; x < 3; x++) {
    if (this.grid[1][1] === mark) {
      if (x === 0) {
        if ((this.grid[x][0] === mark) && (this.grid[2][2] === "")) {
          this.setMark(2, 2);
          return true;
          break;
        } else if ((this.grid[x][2] === mark) && (this.grid[2][0] === "")) {
          this.setMark(2, 0);
          return true;
          break;
        };
      } else if (x === 2) {
        if ((this.grid[x][0] === mark) && (this.grid[0][2] === "")) {
          this.setMark(0, 2);
          return true;
          break;
        } else if ((this.grid[x][2] === mark) && (this.grid[0][0] === "")) {
          this.setMark(0, 0);
          return true;
          break;
        };
      } else if (x === 1) {
        if ((this.grid[2][0] === mark) && (this.grid[0][2] === "")) {
          this.setMark(0, 2);
          return true;
          break;
        } else if ((this.grid[2][2] === mark) && (this.grid[0][0] === "")) {
          this.setMark(0, 0);
          return true;
          break;
        };
      };
    };
  };
  return false;
}

Board.prototype.checkColumns = function(mark) {
  for (var x = 0; x < 3; x++) {
    if (this.grid[x].includes(mark)) {
      if (this.grid[x].indexOf(mark) != this.grid[x].lastIndexOf(mark)) {
        var colGap = this.grid[x].findIndex(function(row) {
          return row === "";
        });
        this.setMark(x, colGap);
        return true;
        break;
      };
    };
  };
  return false;
};

Board.prototype.checkRows = function(mark) {
  for (var y = 0; y < 3; y++) {
    if ((this.grid[0][y] === mark) && (this.grid[1][y] === mark) && (this.grid[2][y] === "")) {
      this.setMark(2, y);
      return true;
      break;
    } else if ((this.grid[1][y] === mark) && (this.grid[2][y] === mark) && (this.grid[0][y] === "")) {
      this.setMark(0, y);
      return true;
      break;
    } else if ((this.grid[0][y] === mark) && (this.grid[2][y] === mark) && (this.grid[1][y] === "")) {
      this.setMark(1, y);
      return true;
      break;
    };
  };
  return false;
};

Board.prototype.smartComp = function() {
  if (this.grid[1][1] === "") {
    this.setMark(1, 1);
  } else if (this.oCount() > 1) {
    try {
      var marked = false;
      if (this.turn % 2 === 0) {
        marked = this.checkDiagonal("O");
      };
      if (this.turn % 2 === 0) {
        marked = this.checkColumns("O");
      };
      if (this.turn % 2 === 0) {
        marked = this.checkRows("O");
      };
      if (this.turn % 2 === 0) {
        marked = this.checkDiagonal("X");
      }
      if (this.turn % 2 === 0) {
        marked = this.checkColumns("X");
      }
      if (this.turn % 2 === 0) {
        marked = this.checkRows("X");
      }
      if (marked === false) {
        throw "no marks"
      }
    } catch (e) {
      this.dumbComp();
    }
  } else {
    this.dumbComp();
  };
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
  var startGame = setInterval(autoRun, 400);

  function autoRun() {
    var endGame = gameBoard.checkGame();
    if (endGame === "X") {
      $("#gameOverResult").text("X's WIN!!!")
      $("#gameOverModal").modal();
      clearInterval(startGame);
    } else if (endGame === "O") {
      $("#gameOverResult").text("O's WIN!!!")
      $("#gameOverModal").modal();
      clearInterval(startGame);
    } else if (endGame === "draw") {
      $("#gameOverResult").text("Cat's Game!!!")
      $("#gameOverModal").modal();
      clearInterval(startGame);
    } else {
      if (gameBoard.turn % 2 === 0) {
        gameBoard.smartComp();
      };
    };
  };

  $("#newGame").click(function() {
    gameBoard.resetBoard();
    gameBoard.draw();
    startGame = setInterval(autoRun, 400)
  })
});
