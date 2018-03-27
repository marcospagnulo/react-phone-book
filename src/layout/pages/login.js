import React from 'react';
import FormField from '../components/formField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as profileActions from '../../store/actions/profileActions';
import { history } from '../../store';
import * as types from '../../store/actionTypes';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { username: "", password: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.registerProfileComponent(this); // Registering component to the reducer for listening action callbacks
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile) {
            history.push("/home")
        }
    }

    /**
     * Function called by the reducer as a callback of some actions
     * 
     * @param {*} actionType 
     */
    actionDispatched(actionType) {

        switch (actionType) {
            case types.LOGIN_ERROR:
                this.props.showMessageBox("Login failed", "danger");
                return;
            default:
                return;
        }
    }

    /**
     * Manage the field value changes updatind the contact in the store
     * 
     * @param {*} event - event fired by input component
     */
    handleFieldChange(event) {

        // Retrieve value and input name
        const target = event.target;
        const fieldValue = target.type === 'checkbox' ? target.checked : target.value;
        const fieldName = target.name;

        // updating component state
        this.setState({
            [fieldName]: fieldValue,
        })
    }

    /**
     * Invoke the login service on subimt of login form
     * @param {*} event 
     */
    handleSubmit(event) {
        event.preventDefault();
        this.props.loginAction({ username: this.state.username, password: this.state.password });
    }

    render() {
        return (
            <div id="login">

                <div className="card">

                    <div className="card-header">
                        <h3>PhoneBook</h3>
                    </div>

                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <FormField
                                edit={true}
                                iconClass="fas fa-user p-1"
                                onFieldChange={(evt) => this.handleFieldChange(evt)}
                                fieldName="username"
                                fieldLabel="Username" />

                            <FormField
                                edit={true}
                                iconClass="fas fa-key p-1"
                                onFieldChange={(evt) => this.handleFieldChange(evt)}
                                fieldType="password"
                                fieldName="password"
                                fieldLabel="Password" />

                            <div className="d-flex justify-content-center pt-3">
                                <button className="btn btn-primary" type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

// Subscribe component to redux store and merge the state into component's props
function mapStateToProps(state) {
    return { profile: state.profile.profile };
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        loginAction: profileActions.loginAction,
        registerProfileComponent: profileActions.registerProfileComponent
    }, dispatch);
}

// connect method from react-router connects the component with redux store
export default connect(mapStateToProps, matchDispatchToProps)(Login);