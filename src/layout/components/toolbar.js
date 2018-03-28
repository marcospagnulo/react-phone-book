import React from 'react';
import { NavLink } from 'react-router-dom';

export default class ToolBar extends React.Component {

    render() {
        return (
            <div id="toolbar" className="p-3">

                {/* Welcome */}
                <div className="welcome">
                    <NavLink to="/profile" activeClassName="active">
                        <i className="far fa-user-circle fa-2x align-middle pr-2"></i>
                        <span className="align-middle pr-3">Welcome {this.props.profile.name}</span>
                    </NavLink>
                </div>
                <i className="fas fa-power-off fa-2x logout float-right" onClick={this.props.logout}></i>
            </div>
        )
    }
}