import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import List from './components/pages/List';
import Matches from './components/pages/Matches';
import SignUp from './components/pages/SignUp';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Switch>
      <Route path='/' exact component={Home} />
          <Route path='/list' component={List} />
          <Route path='/matches' component={Matches} />
          <Route path='/sign-up' component={SignUp} />
      </Switch>
      </Router>
    </>
  );
}

export default App;
