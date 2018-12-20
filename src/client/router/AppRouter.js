import React from 'react';
import { BrowserRouter, Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';
import DepartmentListPage from '../components/DepartmentListPage';
import AddDepartmentPage from '../components/AddDepartmentPage';
import EditDepartmentPage from '../components/EditDepartmentPage';
import Header from '../components/Header';

import createHistory from 'history/createBrowserHistory';
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={DepartmentListPage} exact={true} />
        <Route path="/edit/:id" component={EditDepartmentPage} />
        <Route path="/create" component={AddDepartmentPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
