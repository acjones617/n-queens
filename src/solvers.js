window.noDiagonalConflict = function(board, next) {
  var numberIndex = board.length;
  var numberCheck = next;

  for (var i = 0; i < board.length; i++) {
    if (numberCheck + (i - numberIndex) === board[i] || numberCheck - (i - numberIndex) === board[i]) {
      return false;
    }
  }
  return true;
};

window.findNQueensSolution = function(n) {
  var solution = [];
  var possibleCols = [];
  for (var i = 0; i < n; i++) {
    possibleCols.push(i);
  }

  var findSolutions = function (semiBoard, possibleColsLeft) {
    var currentLengthBoard = semiBoard.length;
    if (currentLengthBoard === n) {
      solution = semiBoard;
      return;
    } else if (solution.length > 0) {
      return;
    } else {
      for (var i = 0; i < possibleColsLeft.length; i++) {
        if (noDiagonalConflict(semiBoard, possibleColsLeft[i])) {
          var newBoard = semiBoard.slice();
          var nextColsLeft = possibleColsLeft.slice();
          newBoard.push(nextColsLeft.splice(i,1)[0]);
          findSolutions(newBoard, nextColsLeft);
        }
      }
    }
  };

  findSolutions([], possibleCols);

  solution = solution || null;

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

window.findNRooksSolution = function(n) {
  var solution = [];
  var possibleCols = [];
  for (var i = 0; i < n; i++) {
    possibleCols.push(i);
  }

  var findSolutions = function (semiBoard, possibleColsLeft) {
    var currentLengthBoard = semiBoard.length;
    if (currentLengthBoard === n) {
      solution = semiBoard;
      return;
    } else if (solution.length > 0) {
      return;
    } else {
      for (var i = 0; i < possibleColsLeft.length; i++) {
        var newBoard = semiBoard.slice();
        var nextColsLeft = possibleColsLeft.slice();
        newBoard.push(nextColsLeft.splice(i,1)[0]);
        findSolutions(newBoard, nextColsLeft);
      }
    }
  };

  findSolutions([], possibleCols);

  solution = solution || null;

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};


window.countNRooksSolutions = function(n) {

  var solutions = 0;
  var possibleCols = [];
  for (var i = 0; i < n; i++) {
    possibleCols.push(i);
  }

  var findSolutions = function (semiBoard, possibleColsLeft) {
    var currentLengthBoard = semiBoard.length;
    if (currentLengthBoard === n) {
      if (n % 2 === 1 & semiBoard[0] === (n-1)/2) {
        solutions++;
      } else {
        solutions+= 2;
      }
    } else {
      var numsToCheck = possibleColsLeft.length;
      if (currentLengthBoard === 0) {
        numsToCheck /= 2;
      }
      for (var i = 0; i < numsToCheck; i++) {
        var newBoard = semiBoard.slice();
        var nextColsLeft = possibleColsLeft.slice();
        newBoard.push(nextColsLeft.splice(i,1)[0]);
        findSolutions(newBoard, nextColsLeft);
      }
    }
  };

  findSolutions([], possibleCols);

  console.log('Single solution for ' + n + ' rooks:', solutions);
  return solutions;
};

