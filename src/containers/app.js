import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import ToolBar from '../components/toolbar';
import BottomBar from '../components/bottombar';
import AlertBox from '../components/alertBox';
import Home from './home';
import Profile from './profile';
import Contacts from './contacts';
import Messages from './messages';
import Login from './login';
import * as profileActions from '../store/actions/profileActions';

class App extends Component {

    constructor(props) {
        super(props);
        this.showMessageBox = this.showMessageBox.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            messageBox: {
                show: false,
                text: "",
                level: ""
            }
        };
    }

    logout() {
        this.props.logoutAction();
    }

    /**
     * Show a message box at the top of the page
     * 
     * @param {*} text - text to be visualized
     * @param {*} level - could be success, warning or error
     */
    showMessageBox(text, level) {

        // show message box
        this.setState({ messageBox: { show: true, text: text, level: level } });

        // hide and reset message box after few seconds
        setTimeout(() => {
            var messageBox = { ...this.state.messageBox }
            messageBox.show = false;
            this.setState({ messageBox })
        }, 3000);
    }

    render() {

        return (

            <div>

                {
                    /* Navigation bar */
                    this.props.profile !== null ? <ToolBar profile={this.props.profile} logout={this.logout} /> : null
                }
                <div className="toolbar-empty-space"></div>

                {/* Main content */}
                <div className="container-fluid">
                    <Switch>
                        <PrivateRoute path="/" authenticated={this.props.profile !== null} component={Home} exact={true} />
                        <Route path="/login" component={Login} />
                        <PrivateRoute path="/home" authenticated={this.props.profile !== null} component={Home} exact={true} />
                        <PrivateRoute path="/profile" authenticated={this.props.profile !== null} showMessageBox={this.showMessageBox} component={Profile} />
                        <PrivateRoute path="/messages" authenticated={this.props.profile !== null} component={Messages} exact={true} />
                        <PrivateRoute path="/messages/:contactId" authenticated={this.props.profile !== null} component={Messages} exact={true} />
                        <PrivateRoute path="/contacts" authenticated={this.props.profile !== null} showMessageBox={this.showMessageBox} component={Contacts} />
                        <PrivateRoute path="/contacts/:contactId" authenticated={this.props.profile !== null} component={Contacts} />} />
                    </Switch>
                </div>

                {
                    /* Bottom bar */
                    this.props.profile !== null ? <BottomBar /> : null
                }

                { /* Alert box*/}
                <AlertBox
                    message={this.state.messageBox.text}
                    className={"alert alert-" + this.state.messageBox.level}
                    display={this.state.messageBox.show} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { profile: state.profile.profile };
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        logoutAction: profileActions.logoutAction
    }, dispatch);
}


/**
 * Cover with authentaction check a route
 */
function PrivateRoute({ component: Component, authenticated, showMessageBox, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === true
                ? <Component {...props} showMessageBox={showMessageBox} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(App));