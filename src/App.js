import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopNews from './TopNews';
import Comment from './Comment';
function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={TopNews}></Route>
          <Route exact path="/comment/:id" component={Comment}></Route>
        </Switch>
      </Router>
  )
}
export default App;