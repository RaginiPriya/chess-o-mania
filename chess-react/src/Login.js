import React, { Component } from 'react'
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from './constants'
import googleLogo from './images/google-logo.png'
import fbLogo from './images/fb-logo.png'
import gitLogo from './images/github-logo.png'

class Login extends Component {
    render() {
        return (
            <div>
                <div className='playWithFriendsBackground'>
                    <div className='playWithFriendsBox'>

                        <div className='login-text'>Login to Chess O'Mania</div>
                        <a href={GOOGLE_AUTH_URL} className='login-logo'>
                            <img src={googleLogo} alt='Google' width='60' height='60' />
                            <span className='login-logo-text'>Login with Google</span>
                        </a><br />
                        <a href={FACEBOOK_AUTH_URL} className='login-logo'>
                            <img src={fbLogo} alt='Facebook' width='50' height='50' />
                            <span className='login-logo-text'>Login with Facebook </span>
                        </a>
                        <br />
                        <a href={GITHUB_AUTH_URL} className='login-logo'>
                            <img src={gitLogo} alt='GitHub' width='60' height='60' />
                            <span className='login-logo-text'>Login with GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login