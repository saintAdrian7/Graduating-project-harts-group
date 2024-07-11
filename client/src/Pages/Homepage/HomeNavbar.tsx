import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContextProvider';
import './HomeNavbar.css';
import { Button } from "@mui/material";


const HomeNavbar: React.FC = () => {
    const {state, dispatch} = useAuth()

    const setDisplayLogin = () => {
        dispatch({ type: 'SHOW MODAL' });
      };

      <Button onClick={setDisplayLogin}>Login</Button>


  if (!state.loggedInUser) {
    return null;
  }

  return (
    <nav className="home-navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          {state.loggedInUser && <Link to="/CreateCourse" className="navbar-link">Create Course</Link>}
        </li>
        <li className="navbar-item">
          <Link to="/login" className="navbar-link">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default HomeNavbar;
