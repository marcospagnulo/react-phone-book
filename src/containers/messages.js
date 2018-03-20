import React from 'react';
import * as profileActions from '../store/actions/messagesActions';
import * as types from '../store/actionTypes';
import { history } from '../store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MessageList from '../components/messageList';

class Messages extends React.Component {

    constructor(props) {

        super(props);

        // Bind functions
        this.handleMessageSelection = this.handleMessageSelection.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleDeleteMessage = this.handleDeleteMessage.bind(this);
        this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
        this.newMessage = this.newMessage.bind(this);
    }

    componentDidMount() {
        this.props.registerMessagesComponent(this); // Registering component to the reducer for listening action callbacks
        this.props.getMessagesAction(this.props.profile.id);
    }

    componentWillReceiveProps(nextProps) {

        const urlParams = nextProps.location.pathname.split('/');

        // Load the message if param message id is declared in url
        if ((urlParams.length > 2 && this.props.message == null) || (this.props.location !== nextProps.location && urlParams.length > 2)) {
            let messageId = urlParams[2];
            let message = nextProps.messages.find((message) => {
                return message.id === parseInt(messageId, 10);
            });
            this.props.selectMessageAction(message);
        }
    }

    /**
     * Function called by the reducer as a callback of some actions
     * 
     * @param {*} actionType 
     */
    actionDispatched(actionType) {

        switch (actionType) {
            case types.SUBMIT_MESSAGE_SUCCESS:
                this.props.showMessageBox("Message submit succuessfully", "success");
                break;
            case types.SUBMIT_MESSAGE_ERROR:
                this.props.showMessageBox("Unable to submit message due to an error", "danger");
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
     * Manage the selection of a message fromt the list
     * 
     * @param {*} message 
     */
    handleMessageSelection(message) {
        if (this.props.message == null || this.props.message.id !== message.id) {
            history.push("/messages/" + message.id);
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

        this.props.message[fieldName] = fieldValue;
        this.props.updateMessageAction(this.props.message);
    }

    /**
     * Submit the form to the message service
     */
    handleSubmitMessage() {
        this.props.submitMessageAction({ userId: this.props.profile.id, message: this.props.message });
    }

    /**
     * Call the action for deleting a message
     */
    handleDeleteMessage() {
        this.props.deleteMessageAction({ userId: this.props.profile.id, messageId: this.props.message.id });
    }

    /**
     * Clear all the inputs inside the form
     */
    resetForm() {
        this.props.selectMessageAction({
            address: "",
            email: "",
            id: null,
            mobile: "",
            name: "",
            password: "",
            surname: ""
        });
    }

    /**
     * Create a new message form
     */
    newMessage() {
        this.setState({ editMode: true });
        this.resetForm();
    }

    render() {

        return (
            <div className="row">
                <div className="w-100 p-3">
                    {/* message list */}
                    <div className="card">
                        <div className="card-header"><span>Message list</span></div>
                        <MessageList message={this.props.message} messages={this.props.messages} handleMessageSelection={(message) => this.handleMessageSelection(message)} />
                    </div>
                </div>
            </div>
        );
    }
}

// Subscribe component to redux store and merge the state into component's props
function mapStateToProps(state) {
    return {
        messages: state.messages.messages,
        message: state.messages.message,
        profile: state.profile.profile
    };
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        registerMessagesComponent: profileActions.registerMessagesComponent,
        getMessagesAction: profileActions.getMessagesAction,
        selectMessageAction: profileActions.selectMessageAction,
        updateMessageAction: profileActions.updateMessageAction,
        submitMessageAction: profileActions.submitMessageAction,
        deleteMessageAction: profileActions.deleteMessageAction
    }, dispatch);
}

// connect method from react-router connects the component with redux store
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Messages));