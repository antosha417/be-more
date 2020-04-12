import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import BeMore from './BeMore';
import AddPhrases from './AddPhrases';

function App() {
  return <>
    <Router>
        <Switch>
          <Route path="/add">
            <AddPhrases />
          </Route>
          <Route path="/">
            <BeMore />
          </Route>
        </Switch>
    </Router>
    </>
}

export default App;
