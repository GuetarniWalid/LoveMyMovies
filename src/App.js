import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './views/Login/Login';
import Accueil from './views//Accueil/Accueil';

function App() {
  return (
    <div className='wrapper'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route exact path='/accueil'>
            <Accueil />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
