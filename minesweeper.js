document.addEventListener('DOMContentLoaded', startGame)

// var board defined:
var board = {
  cells: [
    // {row:0,col:0,isMine:true, hidden:true},
    // {row:0,col:1,isMine:false, hidden:true},
    // {row:0,col:2,isMine:false, hidden:true},
    // {row:1,col:0,isMine:false, hidden:true},
    // {row:1,col:1,isMine:false, hidden:true},
    // {row:1,col:2,isMine:false, hidden:true},
    // {row:2,col:0,isMine:false, hidden:true},
    // {row:2,col:1,isMine:false, hidden:true},
    // {row:2,col:2,isMine:true, hidden:true}
  ]
}

//var board;

function generateBoard(len) {
  board.cells = [];

  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      board.cells.push({row:i, col:j, isMine:false, hidden:true});
    }
  }

  var mineIndex = Math.floor(Math.random()*(len*len));
  board.cells[mineIndex].isMine = true;


}
generateBoard(3);


//
// function BombSet() = {
//
//   function randomBoolean() {
//   var randomNumber = Math.random() >= 0.5;
//   console.log(randomNumber);
//   }
//   // randomBoolean()
//
//   for (var i = 0; i<= board.cells[i]; i++) {
//     board.cells[i].isMine["false"] = randomBoolean()
//   }
// }
// BombSet();



function startGame () {
//_________ANIA #6.3:

  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }

  document.getElementsByClassName('board')[0].addEventListener('click', checkForWin);
  document.getElementsByClassName('board')[0].addEventListener('contextmenu', checkForWin);

  // using 'for in' instead 'for' loop:
  // for (var i in board.cells) {
  //board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  // }
//_______ANIA

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}


function checkForWin (evt) {
  if (evt.target.classList.contains('mine')) { //inspired by EDA's lib
    document.getElementById("sound-loose").play();
  }
  else if (evt.currentTarget.className==="board") { //evt.currentTarget.className is "board" taken from debugger
    document.getElementById("sound-click").play();
  }

  //_______ANIA #6.3:
 //assume that total mines and total correctly marked must be equal:

  var totalMines = 0;
  var totalCorrectlyMarked = 0;

  for (var i = 0; i < board.cells.length; i++) {

    if (board.cells[i].isMine && board.cells[i].isMarked) {
      totalCorrectlyMarked +=1; //if a mine exists and is marked blue correctly. .Marked prop. is added by another function done by eda
    }
    else if (board.cells[i].hidden === true) {
      return;  //note: a square can be both .isMarked set to true and .hidden set to true at the same time.
    }

    if (board.cells[i].isMine === true) {
      totalMines += 1;
    }
  }

  if (totalMines === totalCorrectlyMarked) {
    lib.displayMessage('You won!');
    document.getElementById("sound-win").play();
  }


  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  //_______ANIA:
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;
  for (var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine) {
      count += 1;
    }
  }
  return count;
}
