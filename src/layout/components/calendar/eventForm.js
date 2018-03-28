import React from 'react';
import FormField from '../formField';
import ContactList from '../contact/contactList';

export default class EventForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { "showContactList": false }
    }

    toggleContactList(toggle) {
        setTimeout(() => {
            this.setState({ showContactList: toggle })
        }, 250);
    }

    render() {
        return (
            <div className="popup d-flex justify-content-around align-items-center">

                <div className="event-submit-form">

                    <div className="card">

                        <div className="card-header">
                            <span className="h4">Create event</span>
                            <button type="button" className="close" aria-label="Close" onClick={this.props.onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="card-body">

                            <form onSubmit={(evt) => { evt.preventDefault() }}>

                                <div className="suggestions-wrapper">
                                    <FormField
                                        edit={true}
                                        iconClass="far fa-address-book p-1"
                                        onFieldChange={(evt) => this.props.onFieldChange(evt)}
                                        fieldName="to"
                                        fieldValue={this.props.contact ? this.props.contact.surname + " " + this.props.contact.name : ""}
                                        onBlur={(evt) => this.toggleContactList(false)}
                                        onFocus={(evt) => this.toggleContactList(true)}
                                        fieldLabel="To" />

                                    {
                                        this.state.showContactList ?
                                            <ContactList
                                                className="suggestions-list"
                                                itemClassName="list-group-item list-group-item-action"
                                                contact={this.props.contact}
                                                contacts={this.props.contacts}
                                                onContactSelection={this.props.onContactSelection} />
                                            : null
                                    }
                                </div>

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