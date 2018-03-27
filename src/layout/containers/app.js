import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import ToolBar from '../components/toolbar';
import BottomBar from '../components/bottombar';
import Home from './home';
import Profile from './profile';
import Contacts from './contacts';
import Messages from './messages';
import Login from './login';
import * as profileActions from '../../store/actions/profileActions';
import * as messagesActions from '../../store/actions/messagesActions';
import * as contactsActions from '../../store/actions/contactsActions';
import * as eventActions from '../../store/actions/eventActions';

class App extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = { unreadMessage: 0 };
    }

    componentDidMount() {
        if (this.props.profile) {
            this.props.getMessagesAction(this.props.profile.id);
            this.props.getContactsAction(this.props.profile.id);
            this.props.getEventsAction(this.props.profile.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.messages) {
            let unreadMessage = 0;
            nextProps.messages.forEach((m, index) => {
                unreadMessage = !m.read ? unreadMessage + 1 : unreadMessage;
            })
            this.setState({ unreadMessage: unreadMessage });
        }
    }

    logout() {
        this.props.logoutAction();
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
                        <PrivateRoute
                            path="/"
                            authenticated={this.props.profile !== null}
                            component={Home}
                            exact={true} />
                        <Route
                            path="/login"
                            render={(props) => <Login showMessageBox={this.showMessageBox} {...props} />} />
                        <PrivateRoute
                            path="/home"
                            authenticated={this.props.profile !== null}
                            component={Home} exact={true} />
                        <PrivateRoute
                            path="/profile"
                            authenticated={this.props.profile !== null}
                            component={Profile} />
                        <PrivateRoute
                            path="/messages"
                            authenticated={this.props.profile !== null}
                            component={Messages} exact={true} />
                        <PrivateRoute
                            path="/messages/:messageId"
                            authenticated={this.props.profile !== null}
                            component={Messages} exact={true} />
                        <PrivateRoute
                            path="/contacts"
                            authenticated={this.props.profile !== null}
                            showMessageBox={this.showMessageBox}
                            component={Contacts} />
                        <PrivateRoute
                            path="/contacts/:contactId"
                            authenticated={this.props.profile !== null}
                            component={Contacts} />} />
                    </Switch>
                </div>

                <div className="bottom-empty-space"></div>

                {
                    /* Bottom bar */
                    this.props.profile !== null ? <BottomBar unread={this.state.unreadMessage} /> : null
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profile.profile,
        messages: state.messages.messages
    };
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        logoutAction: profileActions.logoutAction,
        getMessagesAction: messagesActions.getMessagesAction,
        getContactsAction: contactsActions.getContactsAction,
        getEventsAction: eventActions.getEventsAction
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