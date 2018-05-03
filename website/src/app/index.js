import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { injectLayoutBaseCSS } from 'styled-bootstrap-grid';
import configureStore from './store';
import Home from './routes/Home';

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

const customCSS = `
  body {
   margin: 0px !important;
   color: #32323d;
   font-family: "Open Sans", Arial, sans-serif;
  }
`;

const store = configureStore();

injectLayoutBaseCSS(customCSS);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" index="Login" render={props => <Home {...props} />} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

export { store };
