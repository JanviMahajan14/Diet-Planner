import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './global.scss';

import Landing from './components/page/Landing';
import Survey from './components/page/Survey';
import Plan from './components/page/Plan';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Landing} />
        <Route path="/survey" component={Survey} />
        <Route path="/meal-plan" component={Plan} />
      </div>
    );
  }
}

export default App;
