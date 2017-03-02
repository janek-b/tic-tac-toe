# _Tic-Tac-Toe_

#### _Tic-Tac-Toe, 2-28-2017_

#### By _**Janek Brandt and Liam Stabeno**_

## Description
_This project is a simple game of Tic-Tac-Toe._


## Specifications

| Behavior                   | Input Example     | Output Example    |
| -------------------------- | -----------------:| -----------------:|
| A board object that has an array for each row of the grid which then has an array for each column. | board.grid | [[0, 1, 2],[0, 1, 2],[0, 1, 2]] |
| A player object that keeps track of what it's mark is. | player1 = new Player(X) | { player: "player1", mark: X} |
| A board prototype that takes x,y coordinate and sets this location in the grid array equal to the current players mark | board.mark(0, 0) | [[X, 1, 2],[0, 1, 2],[0, 1, 2]] |
| The board object has a variable for the current turn number. if this number gets to 9 with no win condition the game ends in a draw | board.turn | 2 |
| A board prototype that checks for win conditions and checks turn number for draw | board.checkGame() | false |

switch player function, return opposite of what is passed in


## Setup/Installation Requirements

* _Clone the repository_
* _Open index.html file in web browser to view the project locally_
* _Use web server of your choice to host the website_

### License

Copyright (c) 2017 **_Janek Brandt and Liam Stabeno_**

This software is licensed under the MIT license.
