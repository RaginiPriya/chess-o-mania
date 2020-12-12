import { Image, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import logout from './images/logout.png'
import chesslogo from './images/chess logo.png'

class UserNavBar extends Component {

    state = {
        showModal: false,
        redirect: false
    }

    hide = () => {
        this.setState({ showModal: false })
    }

    handleClick = () => {
        this.setState({ showModal: true })
    }

    redirect = () => {
        this.setState({ redirect: true })
    }

    render() {
        console.log(this.props.imageUrl)
        return (
            <div>
                {this.state.redirect ? <Redirect to="/" /> : null}
                <div className='custom-nav'>
                    <div className='tabcontent'>
                        <span className='floatLeft'>
                            <Image src={chesslogo} width="60"
                                height="80" />
                            <span style={{
                                color: 'rgb(142, 68, 173)', fontSize: '40px',
                                fontWeight: 'bold', marginLeft: '10px', fontFamily: 'Rouge Script, cursive'
                            }}>
                                Chess O'Mania
                            </span>
                        </span>

                        <span className='floatRight'>
                            <span className='user-image nav-text-others'>      {this.props.user.username} </span>
                            <DropdownButton

                                title={
                                    <Image src={this.props.user.imageUrl} roundedCircle width="60"
                                        height="60" />
                                }
                            >
                                <Dropdown.Item href="/">
                                    <Row>
                                        <Col sm="2"><img src={logout} alt='' width='20' height='20' /></Col>
                                        <Col sm="10">Logout</Col>
                                    </Row>
                                </Dropdown.Item>
                            </DropdownButton>
                        </span>
                    </div>

                </div>
            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    user: state.userReducer
})

export default connect(mapStateToProps)(UserNavBar)