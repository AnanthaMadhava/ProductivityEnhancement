import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/login';

import Layout from './Layout';

import Learner from './components/addlist/Learner';
import Mentor from './components/addlist/Mentor';
import Database from './components/addlist/Database';
import Details from './components/details';
import PickLearner from './components/pickLearner';
import DatabaseType from './components/databaseType';
import DataTypeQueryBuilder from './components/dataTypeQueryBuilder';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Layout>
          <Route path="/Learner" component={Learner} />
          <Route path="/Mentor" component={Mentor} />
          <Route path="/Database" component={Database}/>
          <Route path="/details" component={Details}/>
          <Route path="/pickLearner" component={PickLearner}/>
          <Route path="/databaseType" component={DatabaseType}/>
          <Route path="/queryBuilder" component={DataTypeQueryBuilder}/>
        </Layout>
      </Switch>
    );
  }
}

export default App;
