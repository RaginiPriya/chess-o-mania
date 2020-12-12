import React, {Component} from 'react'

class Square extends Component{

    handleClick = (square) => {
        const {squares,} = this.props
        const selectedSquare = squares.find((square) => {
            return square.selected === true
        })
        if(selectedSquare && selectedSquare.piece){
            this.props.move(selectedSquare.piece, selectedSquare, null, square)
        }
    }

    render(){        
        const {squares, pieces, myTurn} = this.props
        return(
            <div>
                {
                    squares.map((square, index) => {
                        const evenRow = square.topSize % (12 * 2) === 0;
                        const evenColumn = square.leftSize % (12 * 2) === 0;
                        const dark = evenRow !== evenColumn 
                        const className = `Square ${dark ? 'dark' : 'light'}`
                        const piece = pieces.find((piece) => {
                            return square.row === piece.row && square.column === piece.column
                        })
                        square.piece = piece
                        return(
                            <div className={className}
                            key={index}
                            style={{
                                top: square.top,
                                left: square.left,
                                height: '12vh',
                                width: '12vh',
                                border: square.selected ? '3px solid black' : '1px solid black'
                            }}
                            onClick={(e) => !myTurn ? e.preventDefault() : this.handleClick(square)}>
                            </div>
                        )
                    })
                }
            </div>                
        )        
    }
}

export default Square
