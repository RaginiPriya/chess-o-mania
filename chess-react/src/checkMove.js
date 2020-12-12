const checkForRook = (selectedSquare, square, squares) => {

    const sameRow = selectedSquare.row === square.row
    const sameColumn = selectedSquare.column === square.column

    if (sameRow) {
        var firstColumn, secondColumn

        if (selectedSquare.column < square.column) {
            firstColumn = selectedSquare.column
            secondColumn = square.column
        }
        else {
            firstColumn = square.column
            secondColumn = selectedSquare.column
        }

        const availableSquares = squares.find((availableSquare) => {
            return availableSquare.row === square.row && availableSquare.column > firstColumn && availableSquare.column < secondColumn && availableSquare.piece
        })

        return (availableSquares ? false : true)
    }
    if (sameColumn) {
        var firstRow, secondRow

        if (selectedSquare.row < square.row) {
            firstRow = selectedSquare.row
            secondRow = square.row
        }
        else {
            firstRow = square.row
            secondRow = selectedSquare.row
        }

        const availableSquares = squares.find((availableSquare) => {
            return availableSquare.column === square.column && availableSquare.row > firstRow && availableSquare.row < secondRow && availableSquare.piece
        })

        return (availableSquares ? false : true)
    }

    return false
}

const checkForBishop = (selectedSquare, square, squares) => {
    if (Math.abs(square.row - selectedSquare.row) !== Math.abs(square.column - selectedSquare.column)) {
        return false
    }
    var firstRow, secondRow, firstColumn, secondColumn

    if (selectedSquare.column < square.column) {
        firstColumn = selectedSquare.column
        secondColumn = square.column
    }
    else {
        firstColumn = square.column
        secondColumn = selectedSquare.column
    }
    if (selectedSquare.row < square.row) {
        firstRow = selectedSquare.row
        secondRow = square.row
    }
    else {
        firstRow = square.row
        secondRow = selectedSquare.row
    }

    const availableSquares = squares.find((availableSquare) => {
        return (
            Math.abs(availableSquare.row - square.row) === Math.abs(availableSquare.column - square.column) &&
            availableSquare.row > firstRow && availableSquare.row < secondRow && availableSquare.column > firstColumn && availableSquare.column < secondColumn
            && availableSquare.piece
        )
    })

    return (availableSquares ? false : true)

}


const checkMove = (selectedPiece, selectedSquare, piece, square, squares, kingInCheck) => {
    if (piece) {
        if (selectedPiece.color === piece.color) {
            return false
        }
    }
    if (selectedPiece.piece === 'rook') {
        return checkForRook(selectedSquare, square, squares)
    }

    if (selectedPiece.piece === 'knight') {
        return (
            (Math.abs(selectedSquare.row - square.row) === 2 && Math.abs(selectedSquare.column - square.column) === 1) ||
            (Math.abs(selectedSquare.row - square.row) === 1 && Math.abs(selectedSquare.column - square.column) === 2)
        )
    }

    if (selectedPiece.piece === 'bishop') {
        return checkForBishop(selectedSquare, square, squares)

    }
    if (selectedPiece.piece === 'queen') {
        return checkForRook(selectedSquare, square, squares) || checkForBishop(selectedSquare, square, squares)
    }
    if (selectedPiece.piece === 'king') {

        if ((selectedSquare.row === square.row && Math.abs(selectedSquare.column - square.column) === 1) ||
            (selectedSquare.column === square.column && Math.abs(selectedSquare.row - square.row) === 1) ||
            (Math.abs(selectedSquare.row - square.row) === 1 && Math.abs(selectedSquare.column - square.column) === 1)) {
            return true
        }

        if (!kingInCheck && selectedPiece.hasMoved === undefined && selectedSquare.row === square.row && Math.abs(selectedSquare.column - square.column) === 2) {
            const isLeft = selectedSquare.column - square.column > 0
            const rook = squares.find((availableSquare) => {
                return availableSquare.column === (isLeft ? 1 : 8) && availableSquare.row === square.row && availableSquare.piece && availableSquare.piece.piece === 'rook'
            })
            if (rook && rook.piece.hasMoved === undefined) {
                //squares between them should not be under attack
                const inBetweenPiece = squares.find((availableSquare) => {
                    return (
                        availableSquare.row === rook.row &&
                        (isLeft ? (availableSquare.column > 1) : (availableSquare.column < 8)) &&
                        (isLeft ? (availableSquare.column < selectedSquare.column) : (availableSquare.column > selectedSquare.column)) &&
                        availableSquare.piece
                    )
                })
                if (inBetweenPiece) {
                    return false
                }
                const passThroughSquare = squares.find((availableSquare) => {
                    return (
                        square.row === availableSquare.row &&
                        availableSquare.column === (isLeft ? selectedSquare.column - 1 : selectedSquare.column + 1)
                    )
                })
                const attackingPiece = squares.find((availableSquare) => {
                    return availableSquare.piece && availableSquare.piece.color !== selectedPiece.color && checkMove(availableSquare.piece, availableSquare, passThroughSquare.piece, passThroughSquare, squares)
                })
                if (attackingPiece) {
                    return false
                }
                rook.isCastling = true
                selectedSquare.isCastling = true
                return true
            }
        }

        return false
    }
    if (selectedPiece.piece === 'pawn') {
        const sameColumn = selectedSquare.column === square.column
        var rowDiff, firstRow
        if (selectedPiece.color === 'white') {
            rowDiff = selectedSquare.row - square.row
            firstRow = square.row
        }
        else {
            rowDiff = square.row - selectedSquare.row
            firstRow = selectedSquare.row
        }
        if (sameColumn && rowDiff === 2) {
            if (selectedPiece.hasMoved === undefined) {
                const availableSquares = squares.find((availableSquare) => {
                    return availableSquare.column === square.column && availableSquare.row === firstRow + 1 && availableSquare.piece
                })
                return (availableSquares ? false : true)
            }
            return false
        }
        if (sameColumn && rowDiff === 1 && piece === null) {
            return true
        }
        if (Math.abs(selectedSquare.column - square.column) === 1 && rowDiff === 1 && piece) {
            return true
        }
        return false
    }
}
export default checkMove