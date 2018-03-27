import React from 'react';
import FormField from '../formField';
import ContactList from '../contact/contactList';

export default class EventForm extends React.Component {

    render() {
        return (
            <div className="event-submit">

                <div className="event-submit-form">

                    <div className="card">

                        <div className="card-header">
                            <span>Create event</span>
                            <button type="button" className="close" aria-label="Close" onClick={this.props.onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="card-body">

                            <form onSubmit={(evt) => { evt.preventDefault() }}>

                                <div className="float-left">
                                    <FormField
                                        edit={false}
                                        iconClass="far fa-address-book p-1"
                                        onFieldChange={(evt) => this.props.onFieldChange(evt)}
                                        fieldName="to"
                                        fieldValue={this.props.contact ? this.props.contact.surname + " " + this.props.contact.name : ""}
                                        fieldLabel="To" />
                                    <FormField
                                        edit={true}
                                        iconClass="fas fa-font p-1"
                                        onFieldChange={(evt) => this.props.onFieldChange(evt)}
                                        fieldType="text"
                                        fieldName="title"
                                        fieldLabel="Title" />
                                    <FormField
                                        edit={true}
                                        iconClass="far fa-edit p-1"
                                        onFieldChange={(evt) => this.props.onFieldChange(evt)}
                                        fieldType="textarea"
                                        fieldName="description"
                                        fieldLabel="Description" />
                                </div>

                                <ContactList
                                    className="float-right"
                                    itemClassName="list-group-item list-group-item-action"
                                    contact={this.props.contact}
                                    contacts={this.props.contacts}
                                    onContactSelection={this.props.onContactSelection} />

                                <div className="clearfix"></div>

                                <div className="d-flex justify-content-center pt-3">
                                    <button className="btn btn-primary" onClick={this.props.onSubmitEvent}>Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}