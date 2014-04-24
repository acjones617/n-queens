
//next step: change from recursive function to loop...?

var noDiagonalConflict = function(board, next) {
  var numberIndex = board.length;
  var numberCheck = next;

  for (var i = 0; i < board.length; i++) {
    if (numberCheck + (i - numberIndex) === board[i] || numberCheck - (i - numberIndex) === board[i]) {
      return false;
    }
  }
  return true;
};

window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var solutionCount = 0;

  //possible rows is just a range of numbers from 0 to n now.
  var possibleRows = [];
  for (var i = 0; i < n; i++) {
    possibleRows.push(i);
  }

  // recursively put "queen" on next "row" (aka array cell), in specific "columns" (aka the number in the array cell)
  // If it doesn't diagonally conflict, then continue recursion, otherwise, cut off recursion
  var findSolutions = function(semiBoard, possibleColsLeft, lastIndex) {
    var numsToCheck;
    var currentLengthBoard = semiBoard.length;

    if (currentLengthBoard === n) {
      // count found solution and the mirrored solution,
      // if top element not in exact center, count 2,
      // else just count 1.
      if (n % 2 === 1 && semiBoard[0] === (n-1)/2) {
        solutionCount++;
      } else {
        solutionCount += 2;
      }
      return;
    } else {
      // for first row, we only want to add half of possible Rows
      // then, double count solutions (count mirrored solutions)
      numsToCheck = possibleColsLeft.length;
      if (currentLengthBoard === 0) {
        numsToCheck /= 2;
      }
      for (var i = 0; i < numsToCheck; i++) {
        // simple check to make sure it's not immediate diagonal
        if (possibleColsLeft[i] !== lastIndex - 1 && possibleColsLeft[i] !== lastIndex + 1) {
          // check upfront to make sure diagonal is free
          if (noDiagonalConflict(semiBoard, possibleColsLeft[i])) {
          // create copy of semiBoard so we don't mess with it.
            var newBoard = semiBoard.slice();
            var colsLeft = possibleColsLeft.slice();
            var nextColNum = colsLeft.splice(i,1)[0];
            newBoard.push(nextColNum);
            findSolutions(newBoard, colsLeft, nextColNum);
          }
        }
      }
    }
  };

  findSolutions([], possibleRows, -10);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

