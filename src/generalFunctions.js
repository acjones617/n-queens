
var rows = function() {
    return _(_.range(this.get('n'))).map(function(rowIndex) {
      return this.get(rowIndex);
    }, this);
  };

var hasAnyRooksConflicts = function() {
    return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
  };

var hasAnyQueenConflictsOn = function(rowIndex, colIndex) {
    return (
      this.hasRowConflictAt(rowIndex) ||
      this.hasColConflictAt(colIndex) ||
      this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
      this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
    );
  };

var hasAnyQueensConflicts = function() {
    return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
};

/*
     _             _     _
 ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
/ __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
\__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
|___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

*/
/*=========================================================================
=                 TODO: fill in these Helper Functions                    =
=========================================================================*/

// ROWS - run from left to right
// --------------------------------------------------------------
//
// test if a specific row on this board contains a conflict

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
hasAnyColConflicts: function() {
  for (var i = 0; i < this.attributes.n; i++) {
    if (this.hasColConflictAt(i)) {
      return true;
    }
  }
  return false;
},



// Major Diagonals - go from top-left to bottom-right
// --------------------------------------------------------------
//
// test if a specific major diagonal on this board contains a conflict
hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
  var majorDiag = [];
  var diagColIndex = majorDiagonalColumnIndexAtFirstRow;
  var rowIndex;

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
  var maxIndex = Math.min(this.attributes.n, this.attributes.n - diagColIndex);

  for (var i = -Math.min(diagColIndex,0); i < maxIndex; i++) {
    majorDiag.push(this.attributes[i][diagColIndex + i]);
  }

  return this.moreThanOnePiece(majorDiag);
},

// test if any major diagonals on this board contain conflicts
// doesn't check trivial cases where diagonal only contains one square.
hasAnyMajorDiagonalConflicts: function() {
  for (var i = -this.attributes.n + 2; i < this.attributes.n - 1; i++) {
    if (this.hasMajorDiagonalConflictAt(i)) {
      return true;
    }
  }
  return false;
},



// Minor Diagonals - go from top-right to bottom-left
// --------------------------------------------------------------
//
// test if a specific minor diagonal on this board contains a conflict

hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
  var minorDiag = [];
  var diagColIndex = minorDiagonalColumnIndexAtFirstRow;

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
  var maxIndex = Math.min(diagColIndex + 1, this.attributes.n);
  for (var i = Math.max(0, diagColIndex - this.attributes.n + 1); i < maxIndex; i++) {
    minorDiag.push(this.attributes[i][diagColIndex - i]);
  }

  return this.moreThanOnePiece(minorDiag);
},

// test if any minor diagonals on this board contain conflicts
// doesn't check the trivial cases where diagonal only contains one square;
hasAnyMinorDiagonalConflicts: function() {
  for (var i = 1; i < this.attributes.n*2 - 2; i++) {
    if (this.hasMinorDiagonalConflictAt(i)) {
      return true;
    }
  }
  return false;
}


/*--------------------  End of Helper Functions  ---------------------*/


});


};
