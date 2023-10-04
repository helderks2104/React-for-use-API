import React from 'react';
// React Icons
import { FaHome, FaSignInAlt, FaPowerOff, FaUser, FaUserCircle } from 'react-icons/fa';
// React hooks
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { loginFailure } from '../../store/modules/auth/actions';
import { Nav } from './styled';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  // Instancia que usamos para navegar
  const history = useHistory();

  const logout = e => {
    e.preventDefault();
    dispatch(loginFailure());
    history.push('/');
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUser size={24} />
      </Link>
      {isLoggedIn ? (
        <Link onClick={logout} to="/logout">
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} />
        </Link>
      )}
      {isLoggedIn && (
        <span>
          <FaUserCircle size={24} color="white" />
        </span>
      )}
    </Nav>
  );
}
