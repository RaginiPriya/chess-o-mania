import React, { Component } from 'react'

class Piece extends Component {

    handleClick = (square, piece) => {

        const { pieces, squares, color } = this.props
        const selectedPiece = pieces.find((piece) => {
            return piece.selected === true && piece.color === color
        })

        if (selectedPiece) {
            const selectedSquare = squares.find((square) => {
                return square.selected === true
            })
            this.props.move(selectedPiece, selectedSquare, piece, square)
        }
        else if (piece.color === color) {
            this.props.selectPiece(square, piece)
        }
    }


    render() {
        const { pieces, squares, myTurn } = this.props
        return (
            <div>
                {
                    pieces.map((piece, index) => {
                        const square = squares.find((square) => {
                            return square.row === piece.row && square.column === piece.column
                        })
                        if (square) {
                            return (
                                <div className="Piece"
                                    key={index}
                                    style={{
                                        height: '12vh',
                                        width: '12vh',
                                        top: square.top,
                                        left: square.left
                                    }}
                                    onClick={(e) => !myTurn ? e.preventDefault() : this.handleClick(square, piece)}>
                                    <img style={{ height: '12vh' }} src={piece.icon} alt="piece" />
                                </div>
                            )
                        }
                        return (
                            <div></div>
                        )

                    })
                }
            </div>
        )
    }
}

export default Piece