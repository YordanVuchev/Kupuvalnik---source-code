import React, { useEffect } from 'react';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';

import HomePage from './Views/HomePage/Home';
import NavBar from './Components/NavBar/NavBar';
import Layout from './Components/Layout/Layout';
import RegisterPage from './Views/RegisterPage/RegisterPage';
import MyAccountPage from './Views/MyAccountPage/MyAccountPage';
import LoginPage from './Views/LoginPage/LoginPage';
import { auth, db } from './Config/firebase-config';
import { getAllUsers, getUserData } from './Service/user.service';
import { authActions } from './store/auth-slice';
import { useAppDispatch } from './store/hooks';
import GrowSpinner from './Components/LoadingComponent/GrowSpinner';
import { adsActions } from './store/ads-slice';
import { Routes, Route, Navigate } from 'react-router-dom';
import DetailPage from './Views/DetailPage/DetailPage';
import { onValue, ref } from 'firebase/database';
import { usersActions } from './store/users-slice';
import PageNotFound from './Views/PageNotFound/PageNotFound';
const App = () => {
  const [user, loading, error] = useAuthState(auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      dispatch(usersActions.setUsers(Object.values(response.val())));
      dispatch(usersActions.setUsersAvatars());
    };
    try {
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const adsRef = ref(db, 'ads');
    onValue(adsRef, (snapshot) => {
      if (snapshot.exists()) {
        dispatch(adsActions.setAllAds(Object.values(snapshot.val())));
      }
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    const userRef = ref(db, `users/${user?.uid!}`);
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        dispatch(authActions.login(snapshot.val()));
      }
    });
  }, [user]);

  return (
    <div>
      {error && <PageNotFound />}
      {!error && loading && <GrowSpinner />}{' '}
      {!error && !loading && (
        <Layout>
          <NavBar />

          <Routes>
            <Route path='/' element={<Navigate replace to={'/home'} />} />
            <Route path='/home' element={<HomePage />} />
            <Route
              path='/my-account'
              element={user ? <MyAccountPage /> : <LoginPage />}
            />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route
              path='/detail/:detailId'
              element={user ? <DetailPage /> : <LoginPage />}
            />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Layout>
      )}
    </div>
  );
};

export default App;
