import blackPawn from './images/black_pawn.png';
import blackRook from './images/black_rook.png';
import blackQueen from './images/black_queen.png';
import blackKing from './images/black_king.png';
import blackBishop from './images/black_bishop.png';
import blackKnight from './images/black_knight.png';

import whitePawn from './images/white_pawn.png';
import whiteRook from './images/white_rook.png';
import whiteQueen from './images/white_queen.png';
import whiteKing from './images/white_king.png';
import whiteBishop from './images/white_bishop.png';
import whiteKnight from './images/white_knight.png';

import ChessPiece from './ChessPiece'

const getPieces = () => {
    const pieceArray = [
        new ChessPiece('pawn', 'white', 7, 1, whitePawn),
        new ChessPiece('pawn', 'white', 7, 2, whitePawn),
        new ChessPiece('pawn', 'white', 7, 3, whitePawn),
        new ChessPiece('pawn', 'white', 7, 4, whitePawn),
        new ChessPiece('pawn', 'white', 7, 5, whitePawn),
        new ChessPiece('pawn', 'white', 7, 6, whitePawn),
        new ChessPiece('pawn', 'white', 7, 7, whitePawn),
        new ChessPiece('pawn', 'white', 7, 8, whitePawn),
        new ChessPiece('rook', 'white', 8, 1, whiteRook),
        new ChessPiece('knight', 'white', 8, 2, whiteKnight),
        new ChessPiece('bishop', 'white', 8, 3, whiteBishop),
        new ChessPiece('queen', 'white', 8, 4, whiteQueen),
        new ChessPiece('king', 'white', 8, 5, whiteKing),
        new ChessPiece('bishop', 'white', 8, 6, whiteBishop),
        new ChessPiece('knight', 'white', 8, 7, whiteKnight),
        new ChessPiece('rook', 'white', 8, 8, whiteRook),
        new ChessPiece('pawn', 'black', 2, 1, blackPawn),
        new ChessPiece('pawn', 'black', 2, 2, blackPawn),
        new ChessPiece('pawn', 'black', 2, 3, blackPawn),
        new ChessPiece('pawn', 'black', 2, 4, blackPawn),
        new ChessPiece('pawn', 'black', 2, 5, blackPawn),
        new ChessPiece('pawn', 'black', 2, 6, blackPawn),
        new ChessPiece('pawn', 'black', 2, 7, blackPawn),
        new ChessPiece('pawn', 'black', 2, 8, blackPawn),
        new ChessPiece('rook', 'black', 1, 1, blackRook),
        new ChessPiece('knight', 'black', 1, 2, blackKnight),
        new ChessPiece('bishop', 'black', 1, 3, blackBishop),
        new ChessPiece('queen', 'black', 1, 4, blackQueen),
        new ChessPiece('king', 'black', 1, 5, blackKing),
        new ChessPiece('bishop', 'black', 1, 6, blackBishop),
        new ChessPiece('knight', 'black', 1, 7, blackKnight),
        new ChessPiece('rook', 'black', 1, 8, blackRook)
    ];

    return pieceArray
}
export default getPieces