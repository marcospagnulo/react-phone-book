import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <NavLink to="/" className="navbar-brand" replace={true}>Phone Book</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/profile" className="nav-link" replace={true} activeClassName="active">Profile</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/contacts" className="nav-link" replace={true}>Contacts</NavLink>
                </li>
            </ul>
        </div>
    </nav>
);

export default NavBar;