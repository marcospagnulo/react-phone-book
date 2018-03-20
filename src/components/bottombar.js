import React from 'react';
import { NavLink } from 'react-router-dom';

export default class BottomBar extends React.Component {

    render() {
        return (
            /* Navigation links */
            <div id="bottom-bar">
                <div className="row">
                    {/* Home */}
                    <div className="bottom-bar-item col-sm p-0">
                        <NavLink to="/home" replace={true} activeClassName="active" className="p-2">
                            <i className="fas fa-home fa-2x align-middle pr-2"></i>
                            <span className="align-middle pr-3">Home</span>
                        </NavLink>
                    </div>
                    {/* Messages */}
                    <div className="bottom-bar-item col-sm p-0">
                        <NavLink to="/messages" replace={true} activeClassName="active" className="p-2">
                            <i className="fas fa-comments fa-2x align-middle pr-2"></i>
                            <span className="align-middle pr-3">Messages</span>
                        </NavLink>
                    </div>
                    {/* Contacts */}
                    <div className="bottom-bar-item col-sm p-0">
                        <NavLink to="/contacts" replace={true} activeClassName="active" className="p-2">
                            <i className="fas fa-users fa-2x align-middle pr-2"></i>
                            <span className="align-middle pr-3">Contacts</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}