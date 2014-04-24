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

