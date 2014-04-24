////////////////// ROOKS AND SINGLE QUEENS SOLUTION /////////////////////////

window.findNRooksSolution = function(n) {
  var num = n || 0;
  var solution;
  // never put rooks on same row, treat this as similar to the rock/paper/scissors except each rounds are rows.
  // recursively put rook on next row, check if colConflict.
  // If not, then continue recursion, otherwise, cut off recursion

  //possible rows are arrays of length num, with a single 1 in them.
  var possibleRows = makePossibleRows(num);

  // now generate one solutions:

  var findASolution = function(semiBoard, num) {
    if (solution) {
      return;
    }
    if (semiBoard.length === num) {
      solution = semiBoard;
      return;
    } else {
      for (var i = 0; i < possibleRows.length; i++) {
        var newSemiBoard = semiBoard.slice();
        newSemiBoard.push(possibleRows[i]);
        // i = col on which new queen/rook was added
        // newSemiBoard.length - 1 = row on which new queen/rook was added
        // if already conflicts, scrap it, don't run recursion on it.
        if (noColConflict(newSemiBoard, newSemiBoard.length - 1, i)){
          findASolution(newSemiBoard, num);
        }
      }
    }
  };

  findASolution([], num);

  var singleSolution = solution || null;

  console.log('Single solution for ' + num + ' rooks:', JSON.stringify(singleSolution));
  return singleSolution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var num = n || 0;
  var allSolutions = [];
  // never put rooks on same row, treat this as similar to the rock/paper/scissors except each rounds are rows.
  // recursively put rook on next row, check if colConflict.
  // If not, then continue recursion, otherwise, cut off recursion

  //possible rows are arrays of length num, with a single 1 in them.
  var possibleRows = makePossibleRows(num);

  // now generate all solutions:

  var findAllSolutions = function(semiBoard, num) {
    if (semiBoard.length === num) {
      solutionCount += 1;
    } else {
      for (var i = 0; i < possibleRows.length; i++) {
        var newSemiBoard = semiBoard.slice();
        newSemiBoard.push(possibleRows[i]);
        // i = col on which new queen/rook was added
        // newSemiBoard.length - 1 = row on which new queen/rook was added
        // if already conflicts, scrap it, don't run recursion on it.
        if (noColConflict(newSemiBoard, newSemiBoard.length - 1, i)){
          findAllSolutions(newSemiBoard, num);
        }
      }
    }
  };

  findAllSolutions([], num);


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var num = n || 0;
  var solution;
  // never put queens on same row, treat this as similar to the rock/paper/scissors except each rounds are rows.
  // recursively put rook on next row, check if colConflict.
  // If not, then continue recursion, otherwise, cut off recursion

  //possible rows are arrays of length num, with a single 1 in them.
  var possibleRows = makePossibleRows(num);

  // now generate one solutions:

  var findASolution = function(semiBoard, num) {
    if (solution) {
      return;
    }
    if (semiBoard.length === num) {
      solution = semiBoard;
      return;
    } else {
      for (var i = 0; i < possibleRows.length; i++) {
        var newSemiBoard = semiBoard.slice();
        newSemiBoard.push(possibleRows[i]);
        // i = col on which new queen/rook was added
        // newSemiBoard.length - 1 = row on which new queen/rook was added
        // if already conflicts, scrap it, don't run recursion on it.
        if (noColConflict(newSemiBoard, newSemiBoard.length - 1, i) &&
          noMajorDiagonalConflict(newSemiBoard, newSemiBoard.length - 1, i) &&
          noMinorDiagonalConflict(newSemiBoard, newSemiBoard.length - 1, i)){
          findASolution(newSemiBoard, num);
        }
      }
    }
  };

  findASolution([], num);

  solution = solution || {n: num};

  console.log('Single solution for ' + num + ' queens:', JSON.stringify(solution));
  return solution;
};



///////////////////// N QUEENS ///////////////////////////

/*--------------------  Helper Functions  ---------------------*/

// COLUMNS - run from top to bottom
// --------------------------------------------------------------
//
// test if a specific column on this board contains a conflict
var noColConflict = function(board, rowIndex, colIndex) {
  // board[0].length should refer to num columns on board.
  // minus 1 on the "i bound" since we'll always be checking against placing one on the last row,
  // and we don't want to check that one. We are checking conflicts against that.
  for (var i = 0; i < board.length - 1; i++) {
    // don't check row our current piece is on
    if (board[i][colIndex] === true) {
      return false;
    }
  }
  return true;
};


// Major Diagonals - go from top-left to bottom-right
// --------------------------------------------------------------
//
// test if a specific major diagonal on this board contains a conflict
var noMajorDiagonalConflict = function(board, rowIndex, colIndex) {
  var diagColIndex = colIndex - rowIndex;
  var maxIndex = Math.min(board.length, board[0].length - diagColIndex);
  // check noColConflict for notes
  for (var i = -Math.min(diagColIndex,0); i < maxIndex - 1; i++) {
    if (board[i][diagColIndex + i] === true) {
      return false;
    }
  }
  return true;
};

// Minor Diagonals - go from top-right to bottom-left
// --------------------------------------------------------------
//
// test if a specific minor diagonal on this board contains a conflict

var noMinorDiagonalConflict = function(board, rowIndex, colIndex) {
  var diagColIndex = rowIndex + colIndex;

  var maxIndex = Math.min(diagColIndex + 1, board.length);
  // check noColConflict for notes
  for (var i = Math.max(0, diagColIndex - board[0].length + 1); i < maxIndex - 1; i++) {
    if (board[i][diagColIndex - i] === true){
      return false;
    }
  }
  return true;
};


/*--------------------  End of Helper Functions  ---------------------*/

// take a look at solversSpec.js to see what the tests are expecting

var makeEmptyRow = function(n) {
  return _(_.range(n)).map(function() {
    return false;
  });
};

var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return false;
    });
  });
};

var makePossibleRows = function(n) {
  var rows = makeEmptyMatrix(n);
  for (var i = 0; i < n; i++) {
    rows[i][i] = true;
  }
  return rows;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var num = n || 0;
  var solutionCount = 0;
  // never put rooks on same row, treat this as similar to the rock/paper/scissors except each rounds are rows.
  // recursively put rook on next row, check if colConflict.
  // If not, then continue recursion, otherwise, cut off recursion

  //possible rows are arrays of length num, with a single 1 in them.
  var possibleRows = makePossibleRows(num);

  // now generate one solutions:

  var findASolution = function(semiBoard, num) {
    if (semiBoard.length === num) {
      solutionCount++;
      return;
    } else {
      for (var i = 0; i < possibleRows.length; i++) {
        var newSemiBoard = semiBoard.slice();
        newSemiBoard.push(possibleRows[i]);
        // i = col on which new queen/rook was added
        // newSemiBoard.length - 1 = row on which new queen/rook was added
        // if already conflicts, scrap it, don't run recursion on it.
        if (noColConflict(newSemiBoard, newSemiBoard.length - 1, i) &&
          noMajorDiagonalConflict(newSemiBoard, newSemiBoard.length - 1, i) &&
          noMinorDiagonalConflict(newSemiBoard, newSemiBoard.length - 1, i)){
          findASolution(newSemiBoard, num);
        }
      }
    }
  };

  findASolution([], num);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

