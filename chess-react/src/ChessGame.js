import React, { Component } from 'react'
import generateSquares from './generateSquares'
import getPieces from './getPieces'
import Square from './Square'
import Piece from './Piece'
import checkMove from './checkMove'
import { Redirect } from 'react-router-dom';
import { Modal, Button, Image } from 'react-bootstrap'
import whiteQueen from './images/white_queen.png';
import blackQueen from './images/black_queen.png'
import whiteBishop from './images/white_bishop.png';
import blackBishop from './images/black_bishop.png'
import whiteKnight from './images/white_knight.png';
import blackKnight from './images/black_knight.png'
import whiteRook from './images/white_rook.png';
import blackRook from './images/black_rook.png'
import ChessPiece from './ChessPiece'
import { connect } from 'react-redux';
import home from './images/home.png'

class ChessGame extends Component {
    state = {
        kingInCheck: false,
        kingInCheckMate: false,
        kingInStaleMate: false,
        willPutKingInCheck: false,
        squares: generateSquares(this.props.location.state.color === 'white' ? false : true),
        pieces: getPieces(),
        myTurn: this.props.location.state.color === 'white' ? true : false,
        showQuitModal: false,
        redirect: false,
        showPieceSwapModal: false,
        pieceToSwap: null,
        squareToSwap: null,
        won: false,
        draw: false,
        gameId: this.props.location.state.gameId,
        myPiecesCaptured: [],
        opponentPiecesCaptured: []
    }

    hide = () => {
        this.setState({ showQuitModal: false, showPieceSwapModal: false })
    }

    redirect = () => {
        this.setState({ redirect: true })
    }

    componentDidMount() {
        this.socket = this.props.socket

        this.socket.onmessage = (input) => {
            var data = JSON.parse(input.data)
            if (data.type === 'quit' && !this.state.kingInCheckMate) {
                this.setState({ showQuitModal: true })
            }
            if (data.type === 'swap') {
                const { index, fromSquare, myColor } = data
                const opponentPieceArray = myColor === 'white' ? [whiteQueen, whiteBishop, whiteKnight, whiteRook] :
                    [blackQueen, blackBishop, blackKnight, blackRook]

                const pawnFromSquare = this.state.squares.find((sq) => { return sq.column === fromSquare.column && sq.row === fromSquare.row })
                const pawn = pawnFromSquare.piece
                pawn.row = null
                pawn.column = null
                const pieceType = ['queen', 'bishop', 'knight', 'rook']
                const piece = new ChessPiece(pieceType[index], myColor, fromSquare.row, fromSquare.column, opponentPieceArray[index])
                const pawnToSquare = this.state.squares.find((sq) => { return sq.column === fromSquare.column && sq.row === fromSquare.row })
                pawnToSquare.piece = piece
                piece.row = pawnToSquare.row
                piece.column = pawnToSquare.column
                const pieces = this.state.pieces
                pieces.push(piece)
                this.setState({ pieces: pieces, squares: this.state.squares, myTurn: true });

            }
            if (data.type === 'won') {
                this.setState({ 'won': true })
            }
            else if (data.type === 'draw') {
                this.setState({ 'draw': true })
            }

            if (data.type === 'move') {
                const { fromSquare, toSquare, isCastling } = data
                const from = this.state.squares.find((square) => {
                    return square.row === fromSquare.row && square.column === fromSquare.column
                })
                const to = this.state.squares.find((square) => {
                    return square.row === toSquare.row && square.column === toSquare.column
                })
                if (from.piece.piece === 'rook' || from.piece.piece === 'pawn' || from.piece.piece === 'king') {
                    from.piece.hasMoved = true
                }
                if (to.piece) {
                    this.state.opponentPiecesCaptured.push(to.piece.icon)
                    to.piece.row = null
                    to.piece.column = null
                }
                to.piece = from.piece
                from.piece = null
                to.piece.row = to.row
                to.piece.column = to.column
                if (isCastling) {
                    const rookSquare = this.state.squares.find((square) => {
                        return (
                            square.piece && square.piece.piece === 'rook' &&
                            (square.column === (fromSquare.column > toSquare.column ? 1 : 8)) &&
                            square.row === fromSquare.row
                        )
                    })
                    const rook = rookSquare.piece
                    const moveRookTo = this.state.squares.find((availableSquare) => {
                        return (
                            availableSquare.row === rookSquare.row &&
                            availableSquare.column === (rookSquare.column === 1 ? rookSquare.column + 3 : rookSquare.column - 2)
                        )
                    })
                    moveRookTo.piece = rook
                    rook.row = moveRookTo.row
                    rook.column = moveRookTo.column
                    rookSquare.piece = null
                }
                this.setState({ squares: this.state.squares, pieces: this.state.pieces, myTurn: true })
                this.isCheckMate(this.props.location.state.color)
            }
        }
    }

    componentWillUnmount() {
        console.log('socket closed')
        this.socket.close()
    }

    listenForCheck = () => {
        const king = this.state.squares.find((square) => {
            return square.piece && square.piece.piece === 'king' && square.piece.color === this.props.location.state.color
        })
        const attackingPiece = this.state.squares.find((square) => {
            return square.piece && checkMove(square.piece, square, king.piece, king, this.state.squares)
        })
        return (attackingPiece ? true : false)
    }

    isCheckMate = (color) => {
        const isKingUnderAttack = this.listenForCheck()
        if (isKingUnderAttack) {
            this.setState({ kingInCheck: true })
        }

        const mySquares = this.state.squares.filter((square) => {
            return square.piece && square.piece.color === color
        })

        const hero = mySquares.find((mySquare) => {
            const destSquare = this.state.squares.find((square) => {
                const movePossible = checkMove(mySquare.piece, mySquare, square.piece, square, this.state.squares, isKingUnderAttack)
                if (movePossible) {
                    var willPutInCheck = false
                    const piece = square.piece
                    if (piece) {
                        piece.row = null
                        piece.column = null
                    }
                    square.piece = mySquare.piece
                    square.piece.row = square.row
                    square.piece.column = square.column
                    mySquare.piece = null
                    const isCheck = this.listenForCheck()
                    if (isCheck) {
                        willPutInCheck = true
                    }
                    mySquare.piece = square.piece
                    square.piece = piece
                    mySquare.piece.row = mySquare.row
                    mySquare.piece.column = mySquare.column
                    if (piece) {
                        piece.row = square.row
                        piece.column = square.column
                    }
                    return !willPutInCheck
                }
                return false
            })
            return (destSquare ? true : false)
        })
        if (isKingUnderAttack && !hero) {
            this.setState({ kingInCheckMate: true })
            this.socket.send(JSON.stringify({ 'type': 'won', gameId: this.state.gameId }))
        }
        else if (!isKingUnderAttack && !hero) {
            this.setState({ kingInStaleMate: true })
            this.socket.send(JSON.stringify({ 'type': 'draw', gameId: this.state.gameId }))
        }
    }

    move = (selectedPiece, selectedSquare, piece, square) => {
        this.setState({ willPutKingInCheck: false })
        const movePossible = checkMove(selectedPiece, selectedSquare, piece, square, this.state.squares, this.state.kingInCheck)
        if (movePossible) {
            square.piece = selectedPiece
            selectedPiece.row = square.row
            selectedPiece.column = square.column
            if (piece) {
                piece.row = null
                piece.column = null
            }
            selectedSquare.piece = null
            const isCheck = this.listenForCheck()
            if (isCheck) {
                square.piece = piece
                selectedPiece.row = selectedSquare.row
                selectedPiece.column = selectedSquare.column
                if (piece) {
                    piece.row = square.row
                    piece.column = square.column
                }
                selectedSquare.piece = selectedPiece
                this.setState({ willPutKingInCheck: true })
            }
            else {
                if (piece) {
                    this.state.myPiecesCaptured.push(piece.icon)
                }
                if (selectedPiece.piece === 'rook' || selectedPiece.piece === 'pawn' || selectedPiece.piece === 'king') {
                    selectedPiece.hasMoved = true
                }
                var isCastling = false
                if (selectedSquare.isCastling) {
                    const rookSquare = this.state.squares.find((availableSquare) => {
                        return availableSquare.isCastling && availableSquare.piece && availableSquare.piece.piece === 'rook'
                    })
                    const rook = rookSquare.piece
                    const moveRookTo = this.state.squares.find((availableSquare) => {
                        return (
                            availableSquare.row === rookSquare.row &&
                            availableSquare.column === (rookSquare.column === 1 ? rookSquare.column + 3 : rookSquare.column - 2)
                        )
                    })
                    moveRookTo.piece = rook
                    rook.row = moveRookTo.row
                    rook.column = moveRookTo.column
                    rookSquare.piece = null
                    rook.hasMoved = true
                    rookSquare.isCastling = false
                    selectedSquare.isCastling = false
                    isCastling = true
                }
                if (this.state.kingInCheck) {
                    this.setState({ kingInCheck: false })
                }
                if (selectedPiece.piece === 'pawn' && square.row === (this.props.location.state.color === 'white' ? 1 : 8)) {
                    this.setState({ showPieceSwapModal: true, squareToSwap: square })
                }
                // else {
                this.socket.send(JSON.stringify({ type: 'move', gameId: this.state.gameId, fromSquare: { row: selectedSquare.row, column: selectedSquare.column }, isCastling: isCastling, toSquare: { row: square.row, column: square.column }, myColor: this.props.location.state.color }))
                // }
                this.setState({ myTurn: false })
                selectedPiece.selected = false
                selectedSquare.selected = false
            }
        }
        selectedPiece.selected = false
        selectedSquare.selected = false
        this.setState(prevState => {
            return {
                ...prevState
            };
        });
    }

    selectPiece = (square, piece) => {
        square.selected = true
        piece.selected = true
        this.setState(this.state)
    }

    swapPiece = (pieceImage, index) => {
        const square = this.state.squareToSwap
        const pawn = square.piece
        pawn.row = null
        pawn.column = null
        const pieceType = ['queen', 'bishop', 'knight', 'rook']
        const piece = new ChessPiece(pieceType[index], this.props.location.state.color, square.row, square.column, pieceImage)
        square.piece = piece
        piece.row = square.row
        piece.column = square.column
        const pieces = this.state.pieces
        pieces.push(piece)
        this.setState({ pieces: pieces, squares: this.state.squares });
        this.hide()
        this.socket.send(JSON.stringify({ type: 'swap', gameId: this.state.gameId, index: index, fromSquare: { row: square.row, column: square.column }, myColor: this.props.location.state.color }))
    }

    render() {
        const pieceArray = this.props.location.state.color === 'white' ? [whiteQueen, whiteBishop, whiteKnight, whiteRook] :
            [blackQueen, blackBishop, blackKnight, blackRook]

        return (
            <div>
                {this.state.redirect ? <Redirect to='/home' /> : null}

                <div className='home'>
                    <Image src={home} roundedCircle width='100' height='100' onClick={this.redirect} style={{ cursor: 'pointer' }} />
                </div>
                <div className='my-pieces'>
                    <fieldset>
                        <legend style={{ width: 'auto' }}>
                            <Image src={this.props.user.imageUrl} roundedCircle width='60' height='60' /><span style={{ fontFamily: 'Rouge Script, cursive' }}>{this.props.user.username} </span>
                        </legend>
                        {this.state.myPiecesCaptured.length > 0 ?
                            (
                                this.state.myPiecesCaptured.map((piece) => {
                                    return (
                                        <Image src={piece} roundedCircle width='30' height='30' />
                                    )
                                })
                            )
                            : <div style={{ color: 'rgba(1,1,1,0.3)' }}>Pieces captured</div>
                        }
                    </fieldset>

                </div>
                <div className='opponent-pieces'>
                    <fieldset>
                        <legend style={{ width: 'auto' }}>
                            <Image src={this.props.location.state.opponentImageUrl} roundedCircle width='60' height='60' /><span style={{ fontFamily: 'Rouge Script, cursive' }}>{this.props.location.state.opponentName} </span>
                        </legend>

                        {this.state.opponentPiecesCaptured.length > 0 ?
                            (
                                this.state.opponentPiecesCaptured.map((piece) => {
                                    return (
                                        <Image src={piece} roundedCircle width='30' height='30' />
                                    )
                                })
                            )
                            : <div style={{ color: 'rgba(1,1,1,0.3)' }}>Pieces captured</div>
                        }
                    </fieldset>
                </div>

                <div className='Game'>
                    <div className='Board'>
                        <Square
                            squares={this.state.squares}
                            move={this.move}
                            pieces={this.state.pieces}
                            myTurn={this.state.myTurn}
                        />
                        <Piece
                            pieces={this.state.pieces}
                            squares={this.state.squares}
                            move={this.move}
                            selectPiece={this.selectPiece}
                            myTurn={this.state.myTurn}
                            color={this.props.location.state.color}
                        />
                    </div>
                </div>

                <Modal backdrop='static'
                    aria-labelledby='contained-modal-title-vcenter'
                    centered
                    keyboard={false}
                    show={this.state.showQuitModal || this.state.kingInCheckMate || this.state.draw || this.state.won}
                    onHide={this.hide}
                    className='my-modal'
                    size='lg'
                >
                    <Modal.Header closeButton hidden='true'></Modal.Header>
                    <Modal.Body>
                        <div style={{ textAlign: 'center' }}>
                            <h4>{'GAME OVER!' + (this.state.showQuitModal && !this.state.kingInCheckMate && !this.state.draw && !this.state.won ? ' Opponent Quit' : (this.state.kingInCheckMate ? ' Your King has been captured' : (this.state.draw ? ' DRAW' : ' YOU WON !!')))}</h4>
                            <Button onClick={this.redirect} className='button' style={{ backgroundColor: 'black', border: '1px solid black', width: '150px', marginTop: '20px' }}>HOME</Button>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal backdrop='static'
                    aria-labelledby='contained-modal-title-vcenter'
                    centered
                    keyboard={false}
                    show={this.state.showPieceSwapModal}
                    onHide={this.hide}
                    className='my-modal'
                    size='lg'
                >
                    <Modal.Header closeButton hidden='true'></Modal.Header>
                    <Modal.Body>
                        <div style={{ textAlign: 'center' }}>
                            <h4>Select the piece to swap</h4>
                            {
                                pieceArray.map((piece, index) => {
                                    return (
                                        <span className='piece-box' onClick={() => this.swapPiece(piece, index)}>
                                            <img style={{ height: '20vh' }} src={piece} alt='piece' />
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    socket: state.websocketReducer.socket,
    user: state.userReducer
})

export default connect(mapStateToProps)(ChessGame)