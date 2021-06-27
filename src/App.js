import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PersonalProfile from "./pages/PersonalProfile";
import Verification from "./pages/Verification";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/profile">
            <PersonalProfile />
          </Route>
          <Route path="/verify">
            <Verification />
          </Route>
          <Route path="/">
            <PersonalProfile />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
