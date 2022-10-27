import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { authActions } from '../../store/auth-slice';

import classes from './NavBar.module.css';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logout } from '../../Service/auth.service';
import { NavLink, useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    dispatch(authActions.logout());
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <Navbar bg='dark' variant='dark' className={classes.container}>
      <Container className={classes.container}>
        <Navbar.Brand as={NavLink} to='/home' className={classes.logo}>
          <span>
            <i className='bi bi-coin'></i>
          </span>{' '}
          KUPUVALNIK
        </Navbar.Brand>
        <Nav className={classes.navLinks}>
          <Nav.Link as={NavLink} to='/home'>
            Home
          </Nav.Link>
          {isLoggedIn && (
            <Nav.Link as={NavLink} to='/my-account'>
              MyAccount
            </Nav.Link>
          )}
          {!isLoggedIn && (
            <Nav.Link as={NavLink} to='/login'>
              Login
            </Nav.Link>
          )}
          {!isLoggedIn && (
            <Nav.Link as={NavLink} to='/register'>
              Register
            </Nav.Link>
          )}
          {isLoggedIn && <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
