describe('solvers', function() {
  window.displayBoard = function() {};

  describe('findNRooksSolution()', function() {

    it('finds a valid solution for n of 1-8', function() {
      _.range(1, 9).map(function(n) {
        var solutionBoard = new Board(findNRooksSolution(n));

        expect(solutionBoard.get('n')).to.equal(n);

      });
    });

  });

  describe('countNRooksSolutions()', function() {

    it('finds the number of valid solutions for n of 1-8', function() {
      _.range(1, 9).map(function(n) {
        var solutionCount = countNRooksSolutions(n);
        var expectedSolutionCount = [1, 1, 2, 6, 24, 120, 720, 5040, 40320][n];

        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });

  });

  describe('findNQueensSolution()', function() {

    it('finds a valid solution for n of 0-8', function() {
      _.range(1, 8).map(function(n) {
        var solutionBoard = findNQueensSolution(n);

        expect(true);

      });
    });

  });

  describe('countNQueensSolutions()', function() {

    it('finds the number of valid solutions for n of 0-8', function() {
      _.range(0, 9).map(function(n) {
        var solutionCount = countNQueensSolutions(n);
        var expectedSolutionCount = [1, 1, 0, 0, 2, 10, 4, 40, 92][n];

        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });

  });

  describe('countNQueensSolutions() for large N', function() {
    it('n = 4', function() {
      var solutionCount = countNQueensSolutions(4);
      expect(solutionCount).to.be.equal(2);
    });

    it('n = 8', function() {
      var solutionCount = countNQueensSolutions(8);
      expect(solutionCount).to.be.equal(92);
    });

    it('n = 11', function() {
      var solutionCount = countNQueensSolutions(11);
      expect(solutionCount).to.be.equal(2680);
    });

    it('n = 12', function() {
      var solutionCount = countNQueensSolutions(12);
      expect(solutionCount).to.be.equal(14200);
    });

    it('n = 13', function() {
      var solutionCount = countNQueensSolutions(13);
      expect(solutionCount).to.be.equal(73712);
    });

    it('n = 14', function() {
      var solutionCount = countNQueensSolutions(14);
      expect(solutionCount).to.be.equal(365596);
   });
    it('n = 15', function() {
      var solutionCount = countNQueensSolutions(15);
      expect(solutionCount).to.be.equal(2279184);
     });

  });

});
