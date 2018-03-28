import React from 'react';
import FormField from '../formField';
import ContactList from '../contact/contactList';

export default class MessageSend extends React.Component {

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

                <div className="message-send-form">

                    <div className="card">

                        <div className="card-header">
                            <span className="h4">Send message</span>
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
                                        onBlur={(evt) => this.toggleContactList(false)}
                                        onFocus={(evt) => this.toggleContactList(true)}
                                        onFieldChange={(evt) => this.props.onFieldChange(evt)}
                                        onClick={(evt) => this.handleToFieldClick(evt)}
                                        fieldName="to"
                                        fieldValue={this.props.to}
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
                                    iconClass="far fa-edit p-1"
                                    onFieldChange={(evt) => this.props.onFieldChange(evt)}
                                    fieldType="textarea"
                                    fieldName="text"
                                    fieldLabel="Text" />

                            </form>
                            <div className="d-flex justify-content-center pt-3">
                                <button className="btn btn-primary" onClick={this.props.onSendMessage}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}