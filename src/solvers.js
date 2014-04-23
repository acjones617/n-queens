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

