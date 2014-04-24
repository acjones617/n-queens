//NEXT STEP: Breadcrumb of diagonals.


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

// What will breadcrumb of diagonals look like?
// {}
//  When next col index is added, change appropriate colI (forbidden) down breadcrumb change to false


window.countNQueensSolutions = function(n) {
  var num = n || 0;
  if (num === 0) {
    return 1;
  }
  var solutionCount = 0;

  //possible rows is just a range of numbers from 0 to n now.
  var possibleRows = [];
  for (var i = 0; i < n; i++) {
    possibleRows.push(i);
  }

  var forbiddenCol = [];
  for (var i = 0; i < n; i++) {
    forbiddenCol.push(true);
  }
  var diagCrumbs = [];
  for (var i = 0; i < n; i++) {
    diagCrumbs.push(forbiddenCol.slice());
  }

  var deepCopy = function(arr) {
    var newArr = arr.slice();
    for (var i = 0; i < arr.length; i++) {
      newArr[i] = arr[i].slice();
    }
    return newArr;
  };

  var leaveCrumbs = function(crumbs, rowNum, colNum) {
    var newCrumbs = deepCopy(crumbs);
    for (var i = 1; i < n - rowNum; i++) {
      if (colNum + i < n) {
        newCrumbs[rowNum+i][colNum+i] = false;
      }
      if (colNum - i >= 0) {
        newCrumbs[rowNum+i][colNum-i] = false;
      }
    }
    return newCrumbs;
  };

  // recursively put "queen" on next "row" (aka array cell), in specific "columns" (aka the number in the array cell)
  // If it doesn't diagonally conflict, then continue recursion, otherwise, cut off recursion
  var findSolutions = function(semiBoard, possibleColsLeft, breadCrumbs) {
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
      // don't even bother checking if index is immediate diagonal of lastIndex
      // or if index is +-2 diagonal of lastLastIndex
      for (var i = 0; i < numsToCheck; i++) {
        // check upfront to make sure diagonal is free
        // sending in row/col into breadCrumbs array check
        // we are currently checking on putting num into row = currentLengthBoard index
        // we are looking to see if we can place the column number = possibleColsLeft[i];
        //console.log(currentLengthBoard, breadCrumbs);
        if (breadCrumbs[currentLengthBoard][possibleColsLeft[i]]) {
        // create copy of semiBoard so we don't mess with it.
          var newBoard = semiBoard.slice();
          var colsLeft = possibleColsLeft.slice();
          var nextColNum = colsLeft.splice(i,1)[0];

          if (colsLeft.length >= 1) {
            var newBreadCrumbs = leaveCrumbs(breadCrumbs, semiBoard.length, nextColNum);
          }
          newBoard.push(nextColNum);
          findSolutions(newBoard, colsLeft, newBreadCrumbs);
        }
      }
    }
  };

  findSolutions([], possibleRows, diagCrumbs);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

