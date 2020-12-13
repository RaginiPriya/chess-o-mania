import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import WaitingGameRoom from './WaitingGameRoom';
import store from './store/';
import { Provider } from 'react-redux';
import Login from './Login'
import OAuth2RedirectHandler from './OAuth2RedirectHandler'
import Home from './Home'
import ChessGame from './ChessGame';
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route component={Login} exact path='/' />
            <PrivateRoute component={Home} path='/home' />
            <PrivateRoute component={ChessGame} path='/game' />
            <PrivateRoute component={WaitingGameRoom} path='/waitingroom' />
            <Route component={OAuth2RedirectHandler} path='/oauth2/redirect'></Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
