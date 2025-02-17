import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Analysis from './components/analysis/Analysis';
import MainLayout from './components/layout/MainLayout';
import PrivateRoute from './utils/PrivateRoute';
import AboutUs from './components/AboutUs';
import EditProfile from './components/auth/EditProfile';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/about" component={AboutUs} />
        <Route exact path="/profile/edit" component={() => (
          <MainLayout>
            <EditProfile />
          </MainLayout>
        )} />
        <PrivateRoute path="/analysis" component={() => (
          <MainLayout>
            <Analysis />
          </MainLayout>
        )} />
      </Switch>
    </Router>
  );
}

export default App; 