import React from 'react';
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUser, FaUserCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { loginFailure } from '../../store/modules/auth/actions';
import { Nav } from './styled';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const history = useHistory();
  console.log(isLoggedIn);

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
          <FaSignOutAlt size={24} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} />
        </Link>
      )}
      {isLoggedIn && (
        <span>
          <FaUserCircle size={24} />
        </span>
      )}
    </Nav>
  );
}
