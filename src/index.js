import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/likedRecipes">
        <h1>LikedRecipes</h1>
        <Link to="/">Home</Link>
      </Route>
      <Route path="/">
        <Link to="/likedRecipes">Liked recipes</Link>
        <App />
      </Route>
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
