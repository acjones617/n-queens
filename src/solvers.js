var makeEmptyRow = function(n) {
  return _(_.range(n)).map(function() {
    return 0;
  });
};

////////////////// QUEEN HELPER TO SEE WHAT'S GOING ON ////////////////////////

window.showQueensSolution = function(n) {
  var num = n || 0;
  var solution = [];
  // never put queens on same row, treat this as similar to the rock/paper/scissors except each rounds are rows.
  // recursively put rook on next row, check if colConflict.
  // If not, then continue recursion, otherwise, cut off recursion

  //possible rows are arrays of length num, with a single 1 in them.
  var possibleRows = makePossibleRows(num);

  // now generate solutions:

  var findASolution = function(semiBoard, num) {
    if (semiBoard.length === num) {
      solution.push(semiBoard);
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

  var numeric = [];

  for (var j = 0; j < solution.length; j++) {
    var helper = [];
    for (var k = 0; k < num; k++) {
      for (var z = 0; z < num; z++) {
        if (solution[j][k][z] === true) {
          helper.push(z);
        }
      }
    }
    numeric.push(helper);
  }

  return JSON.stringify(numeric);

};


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
// won't have to do columns now, just won't add previously added number (combinatoral now)


// Major Diagonals - go from top-left to bottom-right
// --------------------------------------------------------------
//
// loop through array, given this one's "column index" (aka board.length - 1),
// lesser indices shouldn't be that number + deltaIndex for major, number - deltaIndex for minor
var noDiagonalConflict = function(board) {
  var numberIndex = board.length - 1;
  var numberCheck = board[numberIndex];

  for (var i = 0; i < board.length - 1; i++) {
    if (numberCheck + (i - numberIndex) === board[i] || numberCheck - (i - numberIndex) === board[i]) {
      return false;
    }
  }
  return true;
};

/*--------------------  End of Helper Functions  ---------------------*/

// take a look at solversSpec.js to see what the tests are expecting

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var num = n || 0;
  var solutionCount = 0;
  // recursively put "queen" on next "row" (aka array cell), in specific "columns" (aka the number in the array cell)
  // If it doesn't diagonally conflict, then continue recursion, otherwise, cut off recursion

  //possible rows is just a range of numbers from 0 to n now.
  var possibleRows = [];
  for (var i = 0; i < n; i++) {
    possibleRows.push(i);
  }

  // now generate solutions:
  var findSolutions = function(semiBoard, possibleRowsLeft) {
    var rowsToCheck;

    if (semiBoard.length === n) {
      // count found solution and the mirrored solution,
      // if top element not in center, else just count 1.
      // if (num % 2 === 1 && semiBoard[0][(num-1)/2]) {
      solutionCount++;
      // } else {
      //   solutionCount += 2;

      return;
    } else {
      // for first row, we only want to add half of possible Rows
      // then, double count solutions (count mirrored solutions)
      rowsToCheck = possibleRowsLeft.length;
      // if (semiBoard.length === 0) {
      //   rowsToCheck = Math.ceil(num/2);
      // }

      for (var i = 0; i < rowsToCheck; i++) {
        // create copy of semiBoard so we don't mess with it.
        var newBoard = semiBoard.slice();
        var rowsLeft = possibleRowsLeft.slice();
        newBoard.push(rowsLeft.splice(i,1)[0]);
        if (noDiagonalConflict(newBoard)) {
          findSolutions(newBoard, rowsLeft);
        }
      }
    }
  };

  findSolutions([], possibleRows);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

