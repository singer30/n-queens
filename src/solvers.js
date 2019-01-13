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
  var solution = undefined;
  var input = {'n': n};
  var blankB = new Board(input); //create new blank board
  var storage = []; //create storage array
  var d = 0;
  
  storage.push(blankB);
  
  while (d < n) {
    var newStorage = [];
    for (var j = 0; j < storage.length; j++) {
      var currentB = storage[j];
      for (var i = d*n; i < n*(d+1); i++) { //loop through 0 up to 3
        var rowIdx = Math.floor(i/n); //determine row and col indices
        var colIdx = i % n;
        
        currentB.togglePiece(rowIdx, colIdx); //toggle blank board using indices

        if (!currentB.hasAnyRooksConflicts()) { //if no conflicts
          var newB = new Board(JSON.parse(JSON.stringify(currentB.rows()))); //copy into new board using .rows
          newStorage.push(newB); //push into storage array
        }
        
        currentB.togglePiece(rowIdx, colIdx); //toggle original board back to blank
      }
    }
    storage = newStorage;
    d++;
  }
  solution = storage[0].rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme
  
  if (n === 1) {
    solutionCount = 1;
  }
  
  if (n > 1) {
    solutionCount = n * countNRooksSolutions(n - 1);
  }
  // var input = {'n': n};
  // var blankB = new Board(input); //create new blank board
  // var storage = []; //create storage array
  // var d = 0;
  
  // storage.push(blankB);
  
  // while (d < n) {
  //   var newStorage = [];
  //   for (var j = 0; j < storage.length; j++) {
  //     var currentB = storage[j];
  //     for (var i = d*n; i < n*(d+1); i++) { //loop through 0 up to 3
  //       var rowIdx = Math.floor(i/n); //determine row and col indices
  //       var colIdx = i % n;
        
  //       currentB.togglePiece(rowIdx, colIdx); //toggle blank board using indices

  //       if (!currentB.hasAnyRooksConflicts()) { //if no conflicts
  //         var newB = new Board(JSON.parse(JSON.stringify(currentB.rows()))); //copy into new board using .rows
  //         newStorage.push(newB); //push into storage array
  //       }
        
  //       currentB.togglePiece(rowIdx, colIdx); //toggle original board back to blank
  //     }
  //   }
  //   storage = newStorage;
  //   d++;
  // }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // var d = 0;
  // var j = 0;
  // var pieces = 0;
  // var input = {'n': n};
  // var newB = new Board(input);
  
  // if (n === 1) {
  //   newB.togglePiece(0, 0);
  //   pieces++;
  // }
  
  
  //   while (pieces < n) { //while pieces < n
  //     newB = new Board(input);
  //     pieces = 0; //reset pieces to 0
      
  //     for (var i = j; i < Math.pow(n, 2); i++) {//loop through matrix, at first starting at 0
  //       var rowIdx = Math.floor(i/n);
  //       var colIdx = i % n;
      
  //       newB.togglePiece(rowIdx, colIdx); //toggle board at indices
  //       pieces++; //increment pieces
      
  //       if (newB.hasAnyQueensConflicts()) { //if board has conflicts
  //         newB.togglePiece(rowIdx, colIdx);//untoggle board
  //         pieces--; //decrement pieces
  //       }
  //     }
  //     j++;
  //   }
    
  // if (n > 1) {
  //   while (d < n) {
  //     for (var i = d*n + j; i < n*(d+1); i++) {
  //       var rowIdx = Math.floor(i/n);
  //       var colIdx = i % n;
          
  //       newB.togglePiece(rowIdx, colIdx);
  //       pieces++;
  //       //if newB has Queen conflicts
  //       if(newB.hasAnyQueensConflicts()) {
  //         //toggle piece back
  //         newB.togglePiece(rowIdx, colIdx);
  //         pieces--;
  //       }
  //     }
  //     d++;
  //   }
  // }
  
  // if (n > 3) {
  //   while (pieces < n) {
  //     newB = new Board(input);
  //     pieces = 0;
      
  //     while (d < n) {
  //       for (var i = d*n + j; i < n*(d+1); i++) {
  //         var rowIdx = Math.floor(i/n);
  //         var colIdx = i % n;
          
  //         newB.togglePiece(rowIdx, colIdx);
  //         pieces++;
  //         //if newB has Queen conflicts
  //         if(newB.hasAnyQueensConflicts()) {
  //           //toggle piece back
  //           newB.togglePiece(rowIdx, colIdx);
  //           pieces--;
  //         }
  //       }
  //       d++;
  //     }
  //     if (pieces < n) {
  //       j++;
  //     }
  //   }
  // }
  // if pieces is n return solution. 
  // var solution = newB.rows();
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // return solution;
    
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
