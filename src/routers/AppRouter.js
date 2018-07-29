import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import App from './../client/App';
// import NavBar from './../components/NavBar';
import BitPage from '../components/BitPage';
import PizzaPage from '../components/PizzaPage'
import NotFoundPage from '../components/NotFoundPage'

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={BitPage} exact={true} />
        <Route path="/bit" component={BitPage} />
        <Route path="/pizza" component={PizzaPage} />

        {/* End component test */}
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
