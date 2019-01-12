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
 //arguments = n, count = 3


window.findNRooksSolution = function(n) {
   var input = {'n': n};
  // input[n] = n;
  //var input = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  var newB = new Board(input);
  var rowIdx = 0;
  var colIdx = 0;
  
  while (rowIdx < n) {
    newB.togglePiece(rowIdx, colIdx);
    
    if (newB.hasAnyRooksConflicts()) {
      newB.togglePiece(rowIdx, colIdx);
      colIdx++;
    } else {
      rowIdx++;
    }
  }
  
  var solution = [];
  
  for (key in newB.attributes) {
    solution.push(newB.attributes[key]);  
  }
  solution.pop();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(newB));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
