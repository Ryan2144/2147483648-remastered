function AI(grid) {
	this.grid = grid;
	this.lastMove = 0;
	this.moves = [0, 1, 2, 3];
}

// Return an int:
// 0: up, 1: right, 2: down, 3: left
AI.prototype.getBest = function () {
	possibleMoves = [];
	for(var direction in this.moves) {
		var newGrid = this.grid.clone();
		if(newGrid.move(direction)) {
			possibleMoves.push({direction: direction, score:  newGrid.scoreGrid()});
		}
	}
	return this.selectBestMove(possibleMoves).direction;
}

AI.prototype.isBottomFull = function () {
	for(var x=0; x<this.grid.size; x++) {
		if(!this.grid.cells[x][3]) return false;
	}
	return true;
}

/*
Return the move from the given list of possible moves with best score but following these rules:
 - Never up unless only possible
 - Don't move left unless bottom is full (see above function)

A move is an object defined as { direction: direction, score: score }
 - Direction -> 0: up, 1: right, 2: down, 3: left
 - Score -> calculated grid score after the move is completed in the given direction

*/
AI.prototype.selectBestMove = function(possibleMoves) {

	badList = [];
	if(possibleMoves.length == 1) {
		return possibleMoves[0];
	}
	else if(!this.isBottomFull()) {
		for (var i=0; i < possibleMoves.length; i++) {
			currentMove = possibleMoves[i];
			if(currentMove.direction == 0 || currentMove.direction == 3) {
				badList.push(possibleMoves.splice(i, 1)[0]);
			}	
		}
	}

	if(upMoveIndex = this.findUpMoveIndex(possibleMoves)) {
		badList.push(possibleMoves.splice(upMoveIndex, 1)[0]);
	}

 	if(possibleMoves.length > 0)
		return this.selectHighestScoringMove(possibleMoves);
	
	return this.selectHighestScoringMove(badList);
}

AI.prototype.selectHighestScoringMove = function(possibleMoves) {
	bestMove = -1;
	bestScore = 0;
	for(var i = 0; i < possibleMoves.length; i++) {
		if (possibleMoves[i].score > bestScore) {
			bestMove = possibleMoves[i];
			bestScore = possibleMoves[i].score
		}
	}
	return bestMove;
}

AI.prototype.findUpMoveIndex = function(possibleMoves) {
	for (var i = 0; i < possibleMoves.length; i++) {
		if (possibleMoves[i].direction == 0) {
			return i;
		}
	}
	return null;
};
