import React from 'react';
import FormField from '../formField';

export default class ContactInfo extends React.Component {

    render() {
        return (

            <div className="card">
                <div className="card-header">
                    <div className="float-left"><h5>Contact info</h5></div>
                    <div className="float-right">
                        {
                            /* Edit */
                            this.props.contact && this.props.contact.id ?
                                <button onClick={() => this.props.toggleEditMode()} className={this.props.editMode ? "btn btn-secondary" : "btn btn-primary"}>
                                    <i className="fas fa-edit p-1"></i>Edit
                                            </button>
                                :
                                null
                        }
                    </div>
                </div>
                {
                    this.props.contact != null ?
                        <div className="card-body">

                            {/* Name */}
                            <FormField
                                edit={this.props.editMode}
                                iconClass="fas fa-user p-1"
                                onFieldChange={(evt) => this.props.handleFieldChange(evt)}
                                fieldName="name"
                                fieldLabel="Name"
                                fieldValue={this.props.contact ? this.props.contact.name : ""} />

                            {/* Surname */}
                            <FormField
                                edit={this.props.editMode}
                                iconClass="fas fa-user p-1"
                                onFieldChange={(evt) => this.props.handleFieldChange(evt)}
                                fieldName="surname"
                                fieldLabel="Surname"
                                fieldValue={this.props.contact ? this.props.contact.surname : ""} />

                            {/* Address */}
                            <FormField
                                edit={this.props.editMode}
                                iconClass="fas fa-map-marker p-1"
                                onFieldChange={(evt) => this.props.handleFieldChange(evt)}
                                fieldName="address"
                                fieldLabel="Address"
                                fieldValue={this.props.contact ? this.props.contact.address : ""} />

                            {/* Mobile */}
                            <FormField
                                edit={this.props.editMode}
                                iconClass="fas fa-mobile-alt p-1"
                                onFieldChange={(evt) => this.props.handleFieldChange(evt)}
                                fieldName="mobile"
                                fieldLabel="Mobile"
                                fieldValue={this.props.contact ? this.props.contact.mobile : ""} />

                            {/* Email */}
                            <FormField
                                edit={this.props.editMode}
                                iconClass="fas fa-envelope p-1"
                                onFieldChange={(evt) => this.props.handleFieldChange(evt)}
                                fieldName="email"
                                fieldLabel="Email"
                                fieldValue={this.props.contact ? this.props.contact.email : ""} />

                            <div className="btn-group mt-2" role="group">
                                {/* Submit */}
                                <button onClick={() => this.props.handleSubmitContact()} className="btn btn-primary">
                                    <i className="fas fa-save p-1"></i>Save
                                    </button>
                                {
                                    /* Delete */
                                    this.props.contact && this.props.contact.id ?
                                        <button onClick={() => this.props.handleDeleteContact()} className="btn btn-danger">
                                            <i className="fas fa-trash p-1"></i>Delete
                                            </button>
                                        :
                                        null
                                }
                            </div>
                        </div>
                        :
                        <div className="card-body">
                            No contact selected
                        </div>
                }
            </div>
        )
    }
}