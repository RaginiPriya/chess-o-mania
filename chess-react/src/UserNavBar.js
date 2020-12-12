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
                            <span style={{color: 'rgb(142, 68, 173)',fontSize: '40px',
  fontWeight: 'bold', marginLeft:'10px',fontFamily: 'Rouge Script, cursive'}}> 
                                Chess O'Mania
                            </span>
                            {/* <span className='nav-text'>Chess</span> */}
                        </span>
                        {/* <span className='history'><img src={history} alt='' width='50' height='45' />
                                <span className='nav-text-others'>History</span> </span> */}

                        <span className='floatRight'>
                            <span className='user-image nav-text-others'>      {this.props.user.username} </span>
                            <DropdownButton

                                title={
                                    <Image src={this.props.user.imageUrl} roundedCircle width="60"
                                        height="60" />
                                }
                            >
                                {/* <Dropdown.Item href="#/action-1">
                                    <Row>
                                        <Col sm="2"><img src={history} alt='' width='30' height='25' /></Col>
                                        <Col sm="10">History</Col>
                                    </Row>
                                </Dropdown.Item> */}
                                <Dropdown.Item href="/">
                                    <Row>
                                        <Col sm="2"><img src={logout} alt='' width='20' height='20' /></Col>
                                        <Col sm="10">Logout</Col>
                                    </Row>
                                </Dropdown.Item>
                            </DropdownButton>
                            {/* <Image src={this.props.user.imageUrl} roundedCircle width="70"
                                height="70" /> */}
                        </span>
                    </div>

                </div>
                {/* <Navbar className="navbar">
                    <Navbar.Brand href="/">
                        <img
                            src={queen}
                            alt=""
                            className="d-inline-block align-top"
                            width="25"
                            height="25"
                            style={{ marginRight: 5 }}
                        />
                        <span style={{
                            fontWeight: 'bold',
                            color: 'white'
                        }}>
                            Chess
                </span>
                    </Navbar.Brand>
                    {
                        this.props.showQuit ?

                            <Navbar.Collapse>
                                <Nav className="ml-auto">
                                    <Nav.Link onClick={() => this.handleClick()}>
                                        <span style={{
                                            fontWeight: 'bold',
                                            color: 'white'
                                        }}>QUIT GAME</span>
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                            : null
                    }
                    <Navbar.Collapse className="justify-content-end">

                        <Image src={this.props.user.imageUrl} roundedCircle width="35"
                            height="30" />

                        <NavDropdown alignRight flip title="" id="basic-nav-dropdown">
                            <NavDropdown.Item >
                                <Container>
                                    <Row className="text-center">
                                        <Image src={this.props.user.imageUrl} roundedCircle width="100" height="100" />
                                    </Row>
                                    <Row className="text-center">
                                        {this.props.user.username}
                                    </Row>
                                </Container>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">
                            <Row>
                                    <Col sm="2"><img src={history} alt='' width='30' height='25' /></Col>
                                    <Col sm="10">History</Col>
                                </Row>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.3">
                                <Row>
                                    <Col sm="2"><img src={logout} alt='' width='20' height='20'/></Col>
                                    <Col sm="10">Logout</Col>
                                </Row>
                                </NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Navbar>
                <Modal backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    keyboard={false}
                    show={this.state.showModal}
                    onHide={this.hide}
                    className="my-modal"
                    size="lg"
                >
                    <Modal.Header closeButton hidden="true"></Modal.Header>
                    <Modal.Body>
                        <div style={{ textAlign: "center" }}>
                            <h4>Are you sure you want to quit the game?</h4>
                            <Button className="button" onClick={this.redirect} style={{ marginRight: '40px', backgroundColor: 'black', border: '1px solid black', width: '150px', marginTop: '20px' }}>Yes</Button>
                            <Button className="button" onClick={this.hide} style={{ backgroundColor: 'black', border: '1px solid black', width: '150px', marginTop: '20px' }}>No</Button>
                        </div>
                    </Modal.Body>
                </Modal> */}
            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    user: state.userReducer
})

export default connect(mapStateToProps)(UserNavBar)