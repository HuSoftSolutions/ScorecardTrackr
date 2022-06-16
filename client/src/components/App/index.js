import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import HistroyPage from '../RoundHistory';
import ActiveRound from '../ActiveRound';
import Reset from '../Reset/Reset.js';
import * as ROUTES from '../../constants/routes';
import ErrorPage from '../ErrorPage/PageNotFound';
import './index.scss';

const App = () => (
  <div className="app-container">
    <Router>
      <Navigation />
      <Routes>
        <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
        <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
        <Route path={ROUTES.HISTORY} element={<HistroyPage />} />
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.ACCOUNT} element={<AccountPage />} />
        <Route path={ROUTES.ADMIN} element={<AdminPage />} />
        <Route path={ROUTES.ACTIVE_ROUND} element={<ActiveRound />} />
        <Route path={ROUTES.RESET} element={<Reset />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />}/> 
      </Routes>
    </Router>
  </div>
);

export default App;
