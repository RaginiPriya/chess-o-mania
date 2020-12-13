import React, { Component } from 'react'
import { Button, FormControl, InputGroup, Image } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import questionmark from './images/questionmark.png'
import home from './images/home.png'

class WaitingGameRoom extends Component {
    state = {
        redirect: false,
        redirectToHome: false,
        gameId: this.props.location.state.gameId,
        color: this.props.location.state.color,
        opponentName: this.props.location.state.opponentName,
        opponentImageUrl: this.props.location.state.opponentImageUrl,
        counter: 5
    }

    constructor(props) {
        super(props);
        this.gameId = React.createRef();
    }

    redirectToHome = () => {
        this.socket.close()
        this.setState({ redirectToHome: true })
    }

    goToGame = () => {
        this.socket.send(JSON.stringify({ "type": "ready" }))
        this.setState({ redirect: true })
    }

    componentDidMount() {
        if (this.state.opponentName) {
            this.startTimer()
        }
        this.socket = this.props.socket

        this.socket.onmessage = (input) => {
            var data = JSON.parse(input.data);
            if (data.color) {
                this.startTimer()
                this.setState({ friends: true, gameId: data.gameId, opponentName: data.opponentName, opponentImageUrl: data.opponentImageUrl, color: data.color })
            }
            else if (data.type === 'quit') {
                clearInterval(this.myTimer)
                this.setState({ opponentName: null, opponentImageUrl: null, counter: 5 })
            }
        }
    }

    copyToClipboard = (e) => {
        this.gameId.select();
        document.execCommand('copy');
        e.target.focus();
    };

    startTimer = () => {
        this.myTimer = setInterval(() => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    counter: prevState.counter - 1
                }
            })
        }, 1000)
    }

    render() {
        return (
            <div>
                {
                    this.state.counter === 0 ? <Redirect to={{
                        pathname: '/game',
                        state: {
                            gameId: this.state.gameId,
                            color: this.state.color,
                            opponentName: this.state.opponentName,
                            opponentImageUrl: this.state.opponentImageUrl
                        }
                    }} /> : null
                }

                {
                    this.state.redirectToHome ? <Redirect to={{
                        pathname: '/home'
                    }} /> : null
                }

                <div className='home'>
                    <Image src={home} roundedCircle width="100" height="100" onClick={this.redirectToHome} style={{ cursor: 'pointer' }} />
                </div>
                <div className='waitingRoomText'>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder={this.props.location.state.gameId}
                            aria-label={this.props.location.state.gameId}
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary light" onClick={() => { navigator.clipboard.writeText(this.props.location.state.gameId) }}>COPY</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <h4 className='cursive-text'>Share this ROOM ID with your friends and ask them to join</h4>
                </div>

                <div className='left-wait'>
                    <div className='image-wait'>
                        <img width='150' height='150' className='imageBorder' src={this.props.user.imageUrl} alt="white" />
                        <h3 className='cursive-text'>{this.props.user.username}</h3>
                    </div>
                </div>

                <div className='right-wait'>
                    <div className='image-wait'>
                        <img width='150' height='150' className='imageBorder' src={this.state.opponentImageUrl ? this.state.opponentImageUrl : questionmark} alt="white" />
                        <h3 className='cursive-text'>{this.state.opponentName}</h3>
                    </div>
                </div>

                {
                    this.state.opponentName ?

                        <h3 className='startText'>GAME starts in {this.state.counter}</h3>
                        : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    socket: state.websocketReducer.socket,
    user: state.userReducer
})

export default connect(mapStateToProps)(WaitingGameRoom)