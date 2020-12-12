import React, { Component } from 'react'
import { Modal, Spinner, Button, Form } from 'react-bootstrap'
import UserNavBar from './UserNavBar'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { API_BASE_URL, HOSTNAME } from './constants'

class Home extends Component {
    state = {
        gameId: null,
        waiting: false,
        color: null,
        opponentName: null,
        opponentImageUrl: null,
        id: null,
        online: false,
        friends: false,
        invalid: false,
        join: false,
    }

    constructor(props) {
        super(props);
        this.joinGameId = React.createRef();
    }

    componentDidMount() {
        fetch(API_BASE_URL + '/user', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                this.setState({ id: data.id })
                this.props.setUser({ username: data.name, imageUrl: data.imageUrl, id: data.id })
            })
    }

    playOnline = () => {
        this.setState({ waiting: true });
        console.log(this.props.user)
        this.socket = new WebSocket('ws://'+ HOSTNAME + '/online/' + this.state.id) //CHANGE before commit
        this.socket.onopen = () => {
            console.log("socket connected");
        }

        this.socket.onclose = () => {
            console.log('socket closed')
        }

        this.socket.onmessage = (input) => {
            var data = JSON.parse(input.data);
            if (data.color) {
                this.setState({ online: true, gameId: data.gameId, color: data.color, opponentName: data.opponentName, opponentImageUrl: data.opponentImageUrl })
            }
            console.log(data)
        }

        this.props.setWs({ socket: this.socket });
    }

    hide = () => {
        this.setState({ waiting: false })
        console.log('socket closed')
        this.socket.close()
        this.props.setWs({ socket: null });
    }

    createGame = () => {
        this.socket = new WebSocket('ws://'+ HOSTNAME + '/create/' + this.state.id) //CHANGE before commit
        this.socket.onopen = () => {
            console.log("socket connected");
        }

        this.socket.onclose = () => {
            console.log('socket closed')
        }

        this.socket.onmessage = (input) => {
            var data = JSON.parse(input.data);
            if (data.type && data.type === 'gameId') {
                this.setState({ friends: true, gameId: data.gameId })
            }
            console.log(data)
        }

        this.props.setWs({ socket: this.socket });
    }

    showInvalid = () => {
        this.setState({ invalid: true })
    }

    showJoin = () => {
        this.setState({ join: true })
    }

    hideJoin = () => {
        this.setState({ join: false })
        if (this.socket) {
            this.socket.close()
        }
        this.props.setWs({ socket: null });
    }

    joinGame = () => {

        this.socket = new WebSocket('ws://'+ HOSTNAME + '/join/' + this.state.id + '/' + this.joinGameId.current.value) //CHANGE before commit
        this.socket.onopen = () => {
            console.log("socket connected");
        }

        this.socket.onclose = () => {
            console.log('socket closed')
        }

        this.socket.onmessage = (input) => {
            var data = JSON.parse(input.data)
            if (data.type && data.type === 'gameId') {
                this.setState({ friends: true, gameId: data.gameId })
            }
            else if (data.color) {
                this.setState({ friends: true, gameId: data.gameId, opponentName: data.opponentName, opponentImageUrl: data.opponentImageUrl, color: data.color })
            }
            else if (data.type && data.type === 'invalid') {
                this.setState({ invalid: true })


            }
            console.log(data)
        }

        this.props.setWs({ socket: this.socket });

    }

    render() {
        const redirect = this.state.gameId && this.state.online ? <Redirect to={{
            pathname: '/game',
            state: {
                gameId: this.state.gameId,
                color: this.state.color,
                opponentName: this.state.opponentName,
                opponentImageUrl: this.state.opponentImageUrl
            }
        }} />
            : this.state.gameId && this.state.friends ? <Redirect to={{
                pathname: '/waitingroom',
                state: {
                    gameId: this.state.gameId,
                    color: this.state.color,
                    opponentName: this.state.opponentName,
                    opponentImageUrl: this.state.opponentImageUrl
                }
            }} />
                : null
        const className = `${this.state.invalid ? 'error' : 'hide-error'}`
        const classNameText = `${this.state.invalid ? 'error-texbox' : ''}`
        return (

            <div>
                {redirect}

                <UserNavBar />
                <div className='leftHalf grow' onClick={this.playOnline} >
                    <div className='imageBox'>
                        PLAY ONLINE
                        </div>
                    <div className='imageBox-text'>
                        Compete against strangers online
                    </div>
                </div>


                <div className='rightHalf grow '>
                    <div className='imageBox'>
                        PLAY WITH FRIENDS
                    </div>
                    <div className='imageBox-text' style={{ left: '24%' }}>
                        <div>Create or join a room and compete against your friend</div>
                        <div><Button onClick={this.createGame} className='button' style={{ backgroundColor: ' rgb(142, 68, 173)', border: '1px solid white', width: '150px', marginTop: '20px' }}>CREATE ROOM</Button></div>

                        <div><Button onClick={this.showJoin} className='button' style={{ backgroundColor: ' rgb(142, 68, 173)', border: '1px solid white', width: '150px', marginTop: '20px' }}>JOIN ROOM</Button></div>
                    </div>
                </div>
                <Modal backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    keyboard={false}
                    show={this.state.waiting}
                    onHide={this.hide}
                    className="my-modal"
                >
                    <Modal.Header closeButton hidden="true"></Modal.Header>
                    <Modal.Body>
                        <div style={{ textAlign: "center" }}>
                            <h4 style={{ marginBottom: '20px' }}>Searching for Opponent</h4>
                            <div>
                                <Spinner animation="border" variant="light" />
                            </div>
                            <Button onClick={this.hide} className='button' style={{ backgroundColor: ' rgb(142, 68, 173)', border: '1px solid white', width: '150px', marginTop: '20px' }}>CANCEL</Button>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    keyboard={false}
                    show={this.state.join}
                    onHide={this.hideJoin}
                    className="my-modal"
                >
                    <Modal.Header closeButton hidden="true"></Modal.Header>
                    <Modal.Body>
                        <div style={{ textAlign: "center" }}>
                            <Form.Control className={classNameText} ref={this.joinGameId} type="text" placeholder="Enter Room ID" />
                            <div className={className}>* Invalid Room ID</div>
                            <Button onClick={this.joinGame} className='button' style={{ backgroundColor: ' rgb(142, 68, 173)', border: '1px solid white', width: '150px', marginTop: '20px' }}>OK</Button>
                            <Button onClick={this.hideJoin} className='button' style={{ backgroundColor: ' rgb(142, 68, 173)', border: '1px solid white', width: '150px', marginTop: '20px' }}>CANCEL</Button>
                        </div>
                    </Modal.Body>
                </Modal>



            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    user: state.userReducer
})

const mapDispatchToProps = (dispatch) => ({
    setWs: (data) => {
        const action = {
            type: 'WS',
            payload: data
        }
        return dispatch(action)
    },
    setUser: (data) => {
        const action = {
            type: 'SET_USER',
            payload: data
        }
        return dispatch(action)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)