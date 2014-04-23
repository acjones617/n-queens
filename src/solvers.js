/*--------------------  Helper Functions  ---------------------*/


var moreThanOnePiece = function(array, index) {
  // return _.reduce(array, function(total, element) {
  //   return total + element;
  // }, 0) > 1;

  for (var i = 0; i < array.length; i++) {
    if (i !== index && array[i] === 1) {
      return true;
    }
  };
  return false;
};

// var returnBoard = function() {
//   var board = this.attributes;
//   var finalBoard = [];
//   for (var i = 0; i < board.n; i++) {
//     finalBoard.push(board[i]);
//   }
//   return finalBoard;
// };


// checking rows is unnecessary, will never put pieces on same row.
var checkRowConflict = function(board, rowIndex, colIndex) {
  return moreThanOnePiece(board[rowIndex], colIndex);
};

// should be unnecessary, will be checking in realtime.
// var hasAnyRowConflicts = function() {
//   for (var i = 0; i < this.attributes.n; i++) {
//     if (this.hasRowConflictAt(i)) {
//       return true;
//     }
//   }
//   return false;
// },

// check any other pieces
var noOtherPieces = function(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === 1) {
      return false;
    }
  }
  return true;
};


// COLUMNS - run from top to bottom
// --------------------------------------------------------------
//
// test if a specific column on this board contains a conflict
var noColConflict = function(board, rowIndex, colIndex) {
  var col = [];

  for (var i = 0; i < board.length; i++) {
    // don't need to push the row our current piece is on
    if (i !== rowIndex) {
      col.push(this.attributes[i][colIndex]);
    }
  }
  return noOtherPieces(col);
};

// test if any columns on this board contain conflicts
// should be unnecessary since checking in realtime
// hasAnyColConflicts: function() {
//   for (var i = 0; i < this.attributes.n; i++) {
//     if (this.hasColConflictAt(i)) {
//       return true;
//     }
//   }
//   return false;
// };



// Major Diagonals - go from top-left to bottom-right
// --------------------------------------------------------------
//
// test if a specific major diagonal on this board contains a conflict
var noMajorDiagonalConflict = function(board, rowIndex, colIndex) {
  var majorDiag = [];
  var diagColIndex = colIndex - rowIndex;

  // if (diagColIndex < 0) {
  //   for (var i = -diagColIndex; i < this.attributes.n; i++) {
  //     majorDiag.push(this.attributes[i][diagColIndex + i]);
  //   }
  // } else {
  //   for (var i = 0; i < this.attributes.n - diagColIndex; i++) {
  //     majorDiag.push(this.attributes[i][diagColIndex + i]);
  //   }
  // }
  // in other words:
  // NOTE: board[0].length supposedly checks column count
  var maxIndex = Math.min(board.length, board[0].length - diagColIndex);

  for (var i = -Math.min(diagColIndex,0); i < maxIndex; i++) {
    // don't need to push the row our current piece is on

    if (i !== rowIndex) {
      majorDiag.push(board[i][diagColIndex + i]);
    }
  }
  return noOtherPieces(majorDiag);
};

//TEST:
// [[0,0,0,1,0,0],
// [0,1,0,0,0,0],
// [0,0,0,0,0,1]]

// test if any major diagonals on this board contain conflicts
// doesn't check trivial cases where diagonal only contains one square.
// shouldn't be necessary, checking in real time.
// hasAnyMajorDiagonalConflicts: function() {
//   for (var i = -this.attributes.n + 2; i < this.attributes.n - 1; i++) {
//     if (this.hasMajorDiagonalConflictAt(i)) {
//       return true;
//     }
//   }
//   return false;
// };



// Minor Diagonals - go from top-right to bottom-left
// --------------------------------------------------------------
//
// test if a specific minor diagonal on this board contains a conflict

var noMinorDiagonalConflict = function(board, rowIndex, colIndex) {
  var minorDiag = [];
  var diagColIndex = rowIndex + colIndex;

  // if (diagColIndex >= this.attributes.n) {
  //   for (var i = diagColIndex - this.attributes.n + 1; i < this.attributes.n; i++) {
  //     minorDiag.push(this.attributes[i][diagColIndex - i]);
  //   }
  // } else {
  //   for (var i = 0; i < diagColIndex + 1; i++) {
  //     minorDiag.push(this.attributes[i][diagColIndex - i]);
  //   }
  // }
  // in other words:
  var maxIndex = Math.min(diagColIndex + 1, board.length);
  // board[0].length should refer to num columns on board.
  for (var i = Math.max(0, diagColIndex - board[0].length + 1); i < maxIndex; i++) {
    // Don't push current row/col we're checking conflict on
    if (i !== rowIndex){
      minorDiag.push(board[i][diagColIndex - i]);
    }
  }

  return noOtherPieces(minorDiag);
};

// test if any minor diagonals on this board contain conflicts
// doesn't check the trivial cases where diagonal only contains one square;
// Shouldn't be necessary anymore, checking in Real Time

/*--------------------  End of Helper Functions  ---------------------*/


/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

var makeEmptyRow = function(n) {
  return _(_.range(n)).map(function() {
    return 0;
  });
};

var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};


window.findNRooksSolution = function(n) {

  var num = n || 0;
  var solution;
  // never put rooks on same row, treat this as similar to the rock/paper/scissors except each rounds are rows.

  // generate list of possible boards;
  var possibleBoards = [];

  //possible rows are arrays of length num, with 1 in them.
  // optimize this later
  var zeroRow = [];
  for (var i = 0; i < num; i++) {
    zeroRow.push(0);
  }

  var possibleRows = [];
  for (var j = 0; j < num; j++) {
    var newRow = zeroRow.slice();
    newRow[j] = 1;
    possibleRows.push(newRow);
  }

  // now generate list of all possible boards:

  var allBoards = function(semiBoard, num) {
    if (semiBoard.length === num) {
      possibleBoards.push(semiBoard);
    } else {
      for (var k = 0; k < possibleRows.length; k++) {
        var newSemiBoard = semiBoard.slice();
        newSemiBoard.push(possibleRows[k]);
        // if already conflicts, scrap it, don't run recursion on it.
        // must move methods out of board methods I think.

        allBoards(newSemiBoard, num);
      }
    }
  };

  allBoards([], num);



  // now check each board. If one passes all tests, it is a solution.
  for (var board = 0; board < possibleBoards.length; board++) {
    var newBoard = new Board(possibleBoards[board]);
    if (!(newBoard.hasAnyRooksConflicts())) {
      solution = newBoard.returnBoard();
      break;
    }
  }
  console.log('Single solution for ' + num + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = undefined; //fixme

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
  var num = n || 0;
  var solutionCount = 0;
  // never put rooks on same row, treat this as similar to the rock/paper/scissors except each rounds are rows.

  // generate list of possible boards;
  var possibleBoards = [];

  //possible rows are arrays of length num, with 1 in them.
  var zeroRow = [];
  for (var i = 0; i < num; i++) {
    zeroRow.push(0);
  }

  var possibleRows = [];
  for (var j = 0; j < num; j++) {
    var newRow = zeroRow.slice();
    newRow[j] = 1;
    possibleRows.push(newRow);
  }

  // now generate list of all possible boards:

  var allBoards = function(semiBoard, num) {
    if (semiBoard.length === num) {
      possibleBoards.push(semiBoard);
    } else {
      for (var k = 0; k < possibleRows.length; k++) {
        var newSemiBoard = semiBoard.slice();
        newSemiBoard.push(possibleRows[k]);
        allBoards(newSemiBoard, num);
      }
    }
  }

  allBoards([], num);



  // now check each board. If one passes all tests, it is a solution.
  for (var board = 0; board < possibleBoards.length; board++) {
    var newBoard = new Board(possibleBoards[board]);
    if (!(newBoard.hasAnyRooksConflicts())) {
      solutionCount+= 1;
    }
  }
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var num = n || 0;
  var solution;
  // never put rooks on same row, treat this as similar to the rock/paper/scissors except each rounds are rows.

  // generate list of possible boards;
  var possibleBoards = [];

  //possible rows are arrays of length num, with 1 in them.
  var zeroRow = [];
  for (var i = 0; i < num; i++) {
    zeroRow.push(0);
  }

  var possibleRows = [];
  for (var j = 0; j < num; j++) {
    var newRow = zeroRow.slice();
    newRow[j] = 1;
    possibleRows.push(newRow);
  }

  // now generate list of all possible boards:

  var allBoards = function(semiBoard, num) {
    if (semiBoard.length === num) {
      possibleBoards.push(semiBoard);
    } else {
      for (var k = 0; k < possibleRows.length; k++) {
        var newSemiBoard = semiBoard.slice();
        newSemiBoard.push(possibleRows[k]);
        allBoards(newSemiBoard, num);
      }
    }
  }

  allBoards([], num);

  // now check each board. If one passes all tests, it is a solution.
  for (var board = 0; board < possibleBoards.length; board++) {
    var newBoard = new Board(possibleBoards[board]);
    if (!(newBoard.hasAnyRowConflicts() || newBoard.hasAnyColConflicts() || newBoard.hasAnyMajorDiagonalConflicts() || newBoard.hasAnyMinorDiagonalConflicts())) {
      solution = newBoard.returnBoard();
      break;
    }
  }
  if (solution) {
    console.log('Single solution for ' + num + ' queens:', JSON.stringify(solution));
    return solution;
  } else {
    return null;
  }
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var num = n || 0;

  // never put rooks on same row, treat this as similar to the rock/paper/scissors except each rounds are rows.

  // generate list of possible boards;
  var possibleBoards = [];

  //possible rows are arrays of length num, with 1 in them.
  var zeroRow = [];
  for (var i = 0; i < num; i++) {
    zeroRow.push(0);
  }

  var possibleRows = [];
  for (var j = 0; j < num; j++) {
    var newRow = zeroRow.slice();
    newRow[j] = 1;
    possibleRows.push(newRow);
  }

  // now generate list of all possible boards:

  var allBoards = function(semiBoard, num) {
    if (semiBoard.length === num) {
      possibleBoards.push(semiBoard);
    } else {
      for (var k = 0; k < possibleRows.length; k++) {
        var newSemiBoard = semiBoard.slice();
        newSemiBoard.push(possibleRows[k]);
        allBoards(newSemiBoard, num);
      }
    }
  }

  allBoards([], num);

  // now check each board. If one passes all tests, it is a solution.
  for (var board = 0; board < possibleBoards.length; board++) {
    var newBoard = new Board(possibleBoards[board]);
    if (!(newBoard.hasAnyRowConflicts() || newBoard.hasAnyColConflicts() || newBoard.hasAnyMajorDiagonalConflicts() || newBoard.hasAnyMinorDiagonalConflicts())) {
      solutionCount++;
    }
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;

};

