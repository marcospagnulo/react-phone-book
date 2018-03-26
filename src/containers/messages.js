import React from 'react';
import * as messageActions from '../store/actions/messagesActions';
import * as types from '../store/actionTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MessageList from '../components/message/messageList';
import MessageSend from '../components/message/messageSend';
import { withReduxComponentRegistration } from '../common/helper';

class Messages extends React.Component {

    constructor(props) {

        super(props);

        // Bind functions
        this.actionDispatched = this.actionDispatched.bind(this);
        this.handleMessageSelection = this.handleMessageSelection.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleReplyMessage = this.handleReplyMessage.bind(this);
        this.handleDeleteMessage = this.handleDeleteMessage.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleContactSelection = this.handleContactSelection.bind(this);

        // Init state
        this.state = { to: "", text: "", send: false }
    }

    componentDidMount() {

        // Select message from param url
        const messageId = this.props.match.params.messageId;
        if (this.props.match.params.messageId) {

            // Find message in list
            let message = this.props.messages.find((message) => {
                return message.id === parseInt(messageId, 10);
            });

            if (message) {
                this.handleMessageSelection(message);
            }
        }
    }

    /**
     * Function called by the reducer as a callback of some actions
     * 
     * @param {*} actionType 
     */
    actionDispatched(actionType) {

        switch (actionType) {
            case types.SEND_MESSAGE_SUCCESS:
                this.props.showMessageBox("Message send succuessfully", "success");
                break;
            case types.SEND_MESSAGE_ERROR:
                this.props.showMessageBox("Unable to send message due to an error", "danger");
                break;
            case types.DELETE_MESSAGE_SUCCESS:
                this.props.showMessageBox("Message deleted succuessfully", "success");
                break;
            case types.DELETE_MESSAGE_ERROR:
                this.props.showMessageBox("Unable to delete message due to an error", "danger");
                break;
            case types.GET_MESSAGES_ERROR:
                this.props.showMessageBox("Unable to get messages due to an error", "danger");
                break;
            default:
                break;
        }
    }

    /**
     * Manage the click on reply message button
     * 
     * @param {*} evt 
     * @param {*} message 
     */
    handleReplyMessage(evt, message) {
        evt.stopPropagation();
        this.handleMessageSelection(message);
        this.setState({ to: message.fromNumber, text: "", send: true });
        console.log("reply message", message);
    }

    /**
     * Manage the click on delete message button
     * 
     * @param {*} evt 
     * @param {*} messageId 
     */
    handleDeleteMessage(evt, messageId) {
        evt.stopPropagation();
        this.handleMessageSelection({ id: messageId });
        this.props.deleteMessageAction({ userId: this.props.profile.id, messageId: messageId });
    }

    /**
     * Manage the selection of a message fromt the list
     * 
     * @param {*} message 
     */
    handleMessageSelection(message) {

        if (this.props.message == null || this.props.message.id !== message.id) {

            //Set read state to message if unread
            if (message && !message.read) {
                message.read = true;
                this.props.readMessageAction(message);
            }

            this.props.selectMessageAction(message);
        }
    }

    /**
     * Manage the field value changes updatind the message in the store
     * 
     * @param {*} event - event fired by input component
     */
    handleFieldChange(event) {

        // Retrieve value and input name
        const target = event.target;
        const fieldValue = target.type === 'checkbox' ? target.checked : target.value;
        const fieldName = target.name;

        // Storing input into component state
        this.setState({ [fieldName]: fieldValue });
    }

    /**
     * Submit the form to the message service
     */
    handleSendMessage() {
        this.props.sendMessageAction({
            "userId": this.state.to,
            "fromNumber": this.props.profile.mobile,
            "text": this.state.text,
            "read": false,
            "sentDate": new Date().getTime()
        });
    }

    /**
     * Store in component state the selected contact
     * 
     * @param {*} contact 
     */
    handleContactSelection(contact) {
        this.setState({ to: contact.mobile });
    }

    /**
     * Close send message modal
     */
    handleClose() {
        this.setState({ to: "", text: "", send: false });
    }

    /**
     * Reset the field of send message form
     */
    newMessage() {
        this.setState({ to: "", text: "", send: true });
    }

    render() {

        return (
            <div className="row">
                <div className="w-100 p-3">
                    {/* message list */}
                    <div className="card">
                        <div className="card-header">
                            <h4 className="float-left">Messages</h4>
                            {/* New Message */}
                            <button onClick={() => this.newMessage()} className="btn btn-primary float-right">
                                <i className="fas fa-plus p-1"></i><span>New message</span>
                            </button>
                        </div>
                        <MessageList
                            message={this.props.message}
                            messages={this.props.messages}
                            handleMessageSelection={this.handleMessageSelection}
                            deleteMessage={this.handleDeleteMessage}
                            replyMessage={this.handleReplyMessage} />
                    </div>
                </div>
                {
                    this.state.send ?
                        <MessageSend
                            contacts={this.props.contacts}
                            onFieldChange={this.handleFieldChange}
                            onSendMessage={this.handleSendMessage}
                            onContactSelection={this.handleContactSelection}
                            onClose={this.handleClose}
                            to={this.state.to} />
                        : null
                }
            </div>
        );
    }
}

// Subscribe component to redux store and merge the state into component's props
function mapStateToProps(state) {
    return {
        messages: state.messages.messages,
        message: state.messages.message,
        profile: state.profile.profile,
        contacts: state.contacts.contacts
    };
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getMessagesAction: messageActions.getMessagesAction,
        selectMessageAction: messageActions.selectMessageAction,
        sendMessageAction: messageActions.sendMessageAction,
        readMessageAction: messageActions.readMessageAction,
        deleteMessageAction: messageActions.deleteMessageAction
    }, dispatch);
}

const reduxCompoment = connect(mapStateToProps, matchDispatchToProps)(Messages);
const routerComponent = withRouter(reduxCompoment);
export default withReduxComponentRegistration(routerComponent, messageActions.registerMessagesComponent);