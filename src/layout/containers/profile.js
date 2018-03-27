import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormField from '../components/formField';
import * as profileActions from '../../store/actions/profileActions'
import { withReduxComponentRegistration } from '../../common/helper';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        // Retrieve value and input name
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // Updating profile field value
        this.props.profile[name] = value;

        // Dispatch update profile action to the store
        this.props.updateProfileAction(this.props.profile);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.submitProfileAction(this.props.profile);
    }

    render() {

        return (
            <div className="row">
                <div className="w-100 p-3">
                    <div className="card">
                        <div className="card-header">
                            <h3>Profile</h3>
                        </div>
                        <div className="card-body">
                            {/* Name */}
                            <FormField
                                edit={true}
                                iconClass="fas fa-user p-1"
                                onFieldChange={this.handleChange}
                                fieldName="name"
                                fieldLabel="Name"
                                fieldValue={this.props.profile.name} />
                            {/* Surname */}
                            <FormField
                                edit={true}
                                iconClass="fas fa-user p-1"
                                onFieldChange={this.handleChange}
                                fieldName="surname"
                                fieldLabel="Surname"
                                fieldValue={this.props.profile.surname} />
                            {/* Address */}
                            <FormField
                                edit={true}
                                iconClass="fas fa-map-marker p-1"
                                onFieldChange={this.handleChange}
                                fieldName="address"
                                fieldLabel="Address"
                                fieldValue={this.props.profile.address} />
                            {/* Mobile */}
                            <FormField
                                edit={true}
                                iconClass="fas fa-mobile-alt p-1"
                                onFieldChange={this.handleChange}
                                fieldName="address"
                                fieldLabel="Mobile"
                                fieldValue={this.props.profile.mobile} />
                            {/* Email */}
                            <FormField
                                edit={true}
                                iconClass="fas fa-envelope p-1"
                                onFieldChange={this.handleChange}
                                fieldName="email"
                                fieldLabel="Email"
                                fieldValue={this.props.profile.email} />
                            {/* Password */}
                            <FormField
                                edit={true}
                                iconClass="fas fa-key p-1"
                                onFieldChange={this.handleChange}
                                fieldName="password"
                                fieldLabel="Password"
                                fieldValue={this.props.profile.password} />
                            <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { profile: state.profile.profile };
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        registerProfileComponent: profileActions.registerProfileComponent,
        submitProfileAction: profileActions.submitProfileAction,
        updateProfileAction: profileActions.updateProfileAction
    }, dispatch);
}

const reduxCompoment = connect(mapStateToProps, matchDispatchToProps)(Profile);
export default withReduxComponentRegistration(reduxCompoment, profileActions.registerProfileComponent);