import React, { Component } from 'react'
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from './constants'
import googleLogo from './images/google-logo.png'
import fbLogo from './images/fb-logo.png'
import gitLogo from './images/github-logo.png'
import { Image } from 'react-bootstrap'
import chesslogo from './images/chess logo.png'

class Login extends Component {
    render() {
        return (
            <div>
                <div className='playWithFriendsBackground'>
                    <div className='playWithFriendsBox'>

                        <div style={{ marginBottom: '60px', fontSize: '35px', color: 'rgb(192, 57, 43)', fontWeight: 'bold', fontFamily: 'Rouge Script, cursive' }}>Login to Chess O'Mania</div>
                        <a href={GOOGLE_AUTH_URL} style={{ width: '50vh', border: '1px solid white', borderRadius: '2px', textAlign: 'center', textDecoration: 'none' }}>
                            <img src={googleLogo} alt="Google" width='60' height='60' />
                            <span style={{ fontSize: '20px', color: 'rgb(142, 68, 173)' }}>Login with Google</span>
                        </a><br />
                        <a href={FACEBOOK_AUTH_URL} style={{ width: '50vh', border: '1px solid white', borderRadius: '2px', textAlign: 'center', textDecoration: 'none' }}>
                            <img src={fbLogo} alt="Facebook" width='50' height='50' />
                            <span style={{ fontSize: '20px', marginLeft: '15px', color: 'rgb(142, 68, 173)' }}>Login with Facebook </span>
                        </a>
                        <br />
                        <a href={GITHUB_AUTH_URL} style={{ width: '50vh', border: '1px solid white', borderRadius: '2px', textAlign: 'center', textDecoration: 'none' }}>
                            <img src={gitLogo} alt="GitHub" width='60' height='60' />
                            <span style={{ fontSize: '20px', marginLeft: '15px', color: 'rgb(142, 68, 173)' }}>Login with GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login