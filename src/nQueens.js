// more complicated version that takes symmetrical solutions into account.

function countNQueensSolutions(n) {
  // start with a list of bit ones, length = n
  var allOnes = (1 << n) - 1;
  // keep track of number of solutions
  var solutions = 0;

  var evenNum = false;
  if (n % 2 === 0) {
    evenNum = true;
  }
  var firstRow = true;

  function recurs(rightCon, leftCon, columnCon, middleRowForOdd) {
    // if our columnConflicts occur in every slot, we have reached a solution,
    // increment solutions.
    // unless we started in the middle row, for odd n's, increment 2.
    // Otherwise, only increment 1 so we don't double count.
    if (columnCon === allOnes) {
      if (evenNum || !middleRowForOdd) {
        solutions += 2;
      } else {
        solutions++;
      }
    } else {
    // the open "slots" aka columns for the next row are defined
    // by taking the inverse of all conflicts and &ing with allOnes
    // Making additional caveat for if this is the first row... only look at half of columns
    // use symmetry to look at other half.
    if (firstRow) {
      if (evenNum) {
        open = ~(rightCon | leftCon | columnCon) & ((1 << n/2) - 1);
      } else {
        open = ~(rightCon | leftCon | columnCon) & ((1 << ((n+1)/2)) - 1);
      }
    } else {
      var open = ~(rightCon | leftCon | columnCon) & allOnes;
    }
      // loop through all possible columns for this next row.
      while (open !== 0) {
        firstRow = false;
        // the next possible column to check will be the "rightmost" one
        // aka the least significant binary number on open bit num
        var nextOpen = (open & -open);
        // remaining open slots = open, less the nextOpen single slot to check.
        open = open ^ nextOpen;
        // check to see if n is odd and we are in middle on first row,
        // switch middleRowForOdd check to true.
        if (((columnCon | open) === 0) && !evenNum) {
          middleRowForOdd = true;
        }
        // save references to the current conflicts
        var right = rightCon;
        var left = leftCon;
        var column = columnCon;

        // update all conflicts for the next recursive row to check 
        rightCon = ((rightCon >> 1) | (nextOpen >> 1)) & allOnes;
        leftCon = ((leftCon << 1) | (nextOpen << 1)) & allOnes;
        columnCon = columnCon | nextOpen;
        // recurse through next row, passing conflicts
        recurs(rightCon, leftCon, columnCon, middleRowForOdd);

        // reset conflicts list for next open slot to check on current row.
        rightCon = right;
        leftCon = left;
        columnCon = column;
      }
    }
  }
  // kick off recursive function with zero conflicts (for top row)
  recurs(0, 0, 0, false);
  
  return solutions;
}


// Less complicated version, doesn't use symmetrical property to only go through first half

// function countNQueensSolutions(n) {
//   // start with a list of bit ones, length = n
//   var allOnes = (1 << n) - 1;
//   // keep track of number of solutions
//   var solutions = 0;

//   function recurs(rightCon, leftCon, columnCon) {
//     // if our columnConflicts occur in every slot, we have reached a solution,
//     // increment solutions.
//     if (columnCon === allOnes) {
//       solutions++;
//     } else {
//     // the open "slots" aka columns for the next row are defined
//     // by taking the inverse of all conflicts and &ing with allOnes
//     var open = ~(rightCon | leftCon | columnCon) & allOnes;
//       // loop through all possible columns for this next row.
//       while (open !== 0) {
//         // the next possible column to check will be the "rightmost" one
//         // aka the least significant binary number on open bit num
//         var nextOpen = (open & -open);
//         // remaining open slots are open, less the nextOpen single slot to check.
//         open = open ^ nextOpen;
//         // save references to the current conflicts
//         var right = rightCon;
//         var left = leftCon;
//         var column = columnCon;

//         // update all conflicts for the next recursive row to check 
//         rightCon = ((rightCon >> 1) | (nextOpen >> 1)) & allOnes;
//         leftCon = ((leftCon << 1) | (nextOpen << 1)) & allOnes;
//         columnCon = columnCon | nextOpen;
//         // recurse through next row, passing conflicts
//         recurs(rightCon, leftCon, columnCon);

//         // reset conflicts list for next open slot to check on current row.
//         rightCon = right;
//         leftCon = left;
//         columnCon = column;
//       }
//     }
//   }
//   // kick off recursive function with zero conflicts (for top row)
//   recurs(0, 0, 0);
  
//   return solutions;
// }