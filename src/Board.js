// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


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
    hasRowConflictAt: function(rowIndex) {
      //create sum variable and assign to zero
      var sum = 0;
      //get row at rowIndex
      var row = this.rows()[rowIndex];
      //loop through row
      for (var i = 0; i < row.length; i++) {
        //add each item to sum
        sum += row[i];
      }
      //if sum is greater than 1
      if(sum > 1) {
        return true
      } else { 
        return false
      }
    },
    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // create a variable and assign it to the rows.
      var rows = this.rows(); 
      // create a variable result and set it equal to false;
      var any = false;
      // loop through the variabls of rows. (i.e. all the arrays);
      for (var i = 0; i < rows.length; i++) {
        // if the result of hasRowConflictAt returns true;
        if (this.hasRowConflictAt(i)) {
          //change the result variable to true and return it. 
          any = true;
        }
      }
      // return result;
      return any;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //create sum variable and assign to zero
      var sum = 0;
      //create rows and assign to this.rows()
      var rows = this.rows();
      //loop through rows
      for (var i = 0; i < rows.length; i++) {
        //add each item at colIndex of row to sum
        sum += rows[i][colIndex];
      }
      //if sum is greater than 1
      if(sum > 1) {
        return true
      } else { 
        return false
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // create a variable and assign it to the rows.
      var rows = this.rows(); 
      // create a variable result and set it equal to false;
      var any = false;
      // loop through the variabls of rows. (i.e. all the arrays);
      for (var i = 0; i < rows.length; i++) {
        // if the result of hasRowConflictAt returns true;
        if (this.hasColConflictAt(i)) {
          //change the result variable to true and return it. 
          any = true;
        }
      }
      // return result;
      return any;
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //create mDx and assign to majorDiagonalColumnIndexAtFirstRow
      var mDx = majorDiagonalColumnIndexAtFirstRow;
      //create rows and assign to this.rows()
      var rows = this.rows();
      //create sum and assign to zero
      var sum = 0;
      
      //if mDx equals zero
      if (mDx === 0) {
        //loop through rows
        for (var i = 0; i < rows.length; i++) {
          //add to sum the item at index i + 1 of row i rows[i][mDx + i]
          sum += rows[i][i];
        }
      }
      
      //if mDx is less than 0
      if (mDx < 0) { 
        //loop through rows setting i equal to -mDx
        for (var i = -mDx; i < rows.length; i++) {
          //add to sum the item at index i - 1 of row i 
          sum += rows[i][i + mDx];
        }
      } 
      
      //if mDx is greater than 0
      if (mDx > 0) {
        //loop through rows setting i = 0;
        for (var i = 0; i < rows.length - mDx; i++) {
          //add to sum the item at index mDx + i of row i
          sum += rows[i][mDx + i];
        }
      }
        
      if (sum > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // create a variable and assign it to the rows.
      var rows = this.rows(); 
      // create a variable result and set it equal to false;
      var any = false;
      // loop through the rows setting i equal to -(length - 1)
      for (var i = 1 - rows.length; i < rows.length; i++) {
        // if the result of hasMajorDiagonalConflictAt returns true;
        if (this.hasMajorDiagonalConflictAt(i)) {
          //change the result variable to true and return it. 
          any = true;
        }
      }
      // return result;
      return any;
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //create mDx and assign to majorDiagonalColumnIndexAtFirstRow
      var mDx = minorDiagonalColumnIndexAtFirstRow;
      //create rows and assign to this.rows()
      var rows = this.rows();
      //create sum and assign to zero
      var sum = 0;
      
      //if mDx equals length minus 1
      if (mDx === rows.length - 1) {
        //loop through rows
        for (var i = 0; i < rows.length; i++) {
          //add to sum the item at index mDx - i of row i
          sum += rows[i][mDx - i];
        }
      }
      
      //if mDx is less than length minus 1
      if (mDx < rows.length - 1) { 
        //loop through rows setting i equal to -mDx
        for (var i = 0; i < mDx + 1; i++) {
          //add to sum the item at index i - 1 of row i 
          sum += rows[i][mDx - i];
        }
      } 
      
      //if mDx is greater than length minus 1
      if (mDx > rows.length - 1) {
        //loop through rows setting i = 0;
        for (var i = mDx - rows.length + 1; i < rows.length; i++) {
          //add to sum the item at index mDx + i of row i
          sum += rows[i][mDx - i];
        }
      }
        
      if (sum > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // create a variable and assign it to the rows.
      var rows = this.rows(); 
      // create a variable result and set it equal to false;
      var any = false;
      // loop through the rows setting i equal to 0 up to length*2 -1
      for (var i = 0; i < (rows.length * 2) - 1; i++) {
        // if the result of hasMajorDiagonalConflictAt returns true;
        if (this.hasMinorDiagonalConflictAt(i)) {
          //change the result variable to true and return it. 
          any = true;
        }
      }
      // return result;
      return any;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
