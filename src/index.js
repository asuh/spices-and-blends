import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

// this will boostrap and run our backend.
import makeServer from './backend';

import Navbar from './components/Navbar/Navbar';

// routes
import App from './frontend/home';
import SpiceDetail from './frontend/spice-detail';
import BlendDetail from './frontend/blend-detail';
import AddBlendForm from './frontend/add-blend';
import { GlobalStateProvider, useGlobalState } from './GlobalState';

function AppWrapper() {
  const { loading } = useGlobalState();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Switch>
      <Route path="/" exact>
        <App />
      </Route>
      <Route path="/spices/:id">
        <SpiceDetail />
      </Route>
      <Route path="/blends/:id">
        <BlendDetail />
      </Route>
      <Route path="/add-blend">
        <AddBlendForm />
      </Route>
    </Switch>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalStateProvider>
      <Router>
        <a href="#main" className="visually-hidden">Skip to Content</a>
        <header>
          <Navbar />
        </header>
        <AppWrapper />
      </Router>
    </GlobalStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

makeServer();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
