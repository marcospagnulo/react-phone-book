import React from 'react';
import FormField from '../formField';

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
                            <form onSubmit={(evt) => this.props.onSendMessage(evt)}>
                                <FormField
                                    edit={true}
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

                                <div className="d-flex justify-content-center pt-3">
                                    <button className="btn btn-primary" type="submit">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}