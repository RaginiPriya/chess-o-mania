import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

class OAuth2RedirectHandler extends Component {

    getToken(){
        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('token')
        return token
    }

    render() {
        const token = this.getToken();
        if(token){
            this.props.setUser({token:token})
            // fetch(API_BASE_URL+'/user', {
            //     method: 'GET',
            //     headers: {
            //       'Authorization': 'Bearer ' + token,
            //     }
            // })
            //     .then((response) => {
            //         return response.json()
            //     })
            //     .then((data) => {
            //         console.log(data)
            //         this.props.setUser({token:token, username: data.name, imageUrl: data.imageUrl, id: data.id})
            //     })
            
            return (
                <Redirect to={{
                    pathname: '/home',
                }} />
            )
        }
        else {
            return <Redirect to={{
                pathname: '/'
            }} />
        }
        
    }
}

const mapDispatchToProps = (dispatch) => ({
    setUser: (data) => {
        const action = {
            type: 'SET_USER',
            payload: data
        }
        return dispatch(action)
    } 
})

export default connect(null, mapDispatchToProps)(OAuth2RedirectHandler)