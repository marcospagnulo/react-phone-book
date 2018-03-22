import React from 'react';
import FormField from '../formField';
import ContactList from '../contact/contactList';

export default class MessageSend extends React.Component {

    render() {
        return (
            <div className="message-send">

                <div className="message-send-form">

                    <div className="card">

                        <div className="card-header">
                            <span>Send message</span>
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
                                        fieldValue={this.props.to}
                                        fieldLabel="To" />
                                    <FormField
                                        edit={true}
                                        iconClass="far fa-edit p-1"
                                        onFieldChange={(evt) => this.props.onFieldChange(evt)}
                                        fieldType="textarea"
                                        fieldName="text"
                                        fieldLabel="Text" />

                                </div>

                                <ContactList
                                    className="float-right"
                                    itemClassName="list-group-item list-group-item-action"
                                    contact={this.props.contact}
                                    contacts={this.props.contacts}
                                    onContactSelection={this.props.onContactSelection} />

                                <div className="clearfix"></div>

                                <div className="d-flex justify-content-center pt-3">
                                    <button className="btn btn-primary" onClick={this.props.onSendMessage}>Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}