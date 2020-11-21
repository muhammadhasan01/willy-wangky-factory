import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Login from './login/Login';
import { Form, Nav } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Willy Wangky Factory</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav.Link href="/sign-in">Login</Nav.Link>
          </Navbar.Collapse>
        </Navbar> */}
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path="/sign-in" component={Login} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
