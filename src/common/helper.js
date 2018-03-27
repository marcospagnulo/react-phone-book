import React from 'react';
import * as types from '../store/actionTypes';
import { store } from '../store/';
import AlertBox from '../layout/components/alertBox';

/**
 * Decorator for registering a component into redux store. This decorator also manage all the callback actions and notifify the UI with a popup
 * 
 * @param {*} WrappedComponent 
 * @param {*} registerComponent 
 */
export function withReduxComponentRegistration(WrappedComponent, registerComponent) {

    return class extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                messageBox: {
                    show: false,
                    text: "",
                    level: ""
                }
            };
        }

        componentDidMount() {
            // Registering component to the reducer for listening action callbacks
            store.dispatch(registerComponent(this));
        }

        /**
         * Show a message box at the top of the page
         * 
         * @param {*} text - text to be visualized
         * @param {*} level - could be success, warning or error
         */
        showMessageBox(text, level) {

            // show message box
            this.setState({ messageBox: { show: true, text: text, level: level } });

            // hide and reset message box after few seconds
            setTimeout(() => {
                var messageBox = { ...this.state.messageBox }
                messageBox.show = false;
                this.setState({ messageBox })
            }, 3000);
        }

        /**
         * Function called by the reducer as a callback of some actions
         * 
         * @param {*} actionType 
         */
        actionDispatched(actionType) {

            switch (actionType) {

                case types.SEND_MESSAGE_SUCCESS:
                    this.showMessageBox("Message send succuessfully", "success");
                    break;
                case types.SEND_MESSAGE_ERROR:
                    this.showMessageBox("Unable to send message due to an error", "danger");
                    break;
                case types.DELETE_MESSAGE_SUCCESS:
                    this.showMessageBox("Message deleted succuessfully", "success");
                    break;
                case types.DELETE_MESSAGE_ERROR:
                    this.showMessageBox("Unable to delete message due to an error", "danger");
                    break;
                case types.GET_MESSAGES_ERROR:
                    this.showMessageBox("Unable to get messages due to an error", "danger");
                    break;

                case types.SUBMIT_CONTACT_SUCCESS:
                    this.showMessageBox("Contact submit succuessfully", "success");
                    break;
                case types.SUBMIT_CONTACT_ERROR:
                    this.showMessageBox("Unable to submit contact due to an error", "danger");
                    break;
                case types.DELETE_CONTACT_SUCCESS:
                    this.showMessageBox("Contact deleted succuessfully", "success");
                    break;
                case types.DELETE_CONTACT_ERROR:
                    this.showMessageBox("Unable to delete contact due to an error", "danger");
                    break;
                case types.GET_CONTACTS_ERROR:
                    this.showMessageBox("Unable to get contacts due to an error", "danger");
                    break;

                case types.SUBMIT_EVENT_SUCCESS:
                    this.showMessageBox("Event created succuessfully", "success");
                    break;
                case types.SUBMIT_EVENT_ERROR:
                    this.showMessageBox("Unable to create event due to an error", "danger");
                    break;
                case types.DELETE_EVENT_SUCCESS:
                    this.showMessageBox("Event deleted succuessfully", "success");
                    break;
                case types.DELETE_EVENT_ERROR:
                    this.showMessageBox("Unable to delete event due to an error", "danger");
                    break;
                case types.GET_EVENTS_ERROR:
                    this.showMessageBox("Unable to get events due to an error", "danger");
                    break;

                case types.SUBMIT_PROFILE_SUCCESS:
                    this.showMessageBox("Profile submit succuessfully", "success");
                    return;
                case types.SUBMIT_PROFILE_ERROR:
                    this.showMessageBox("Unable to submit profile due to an error", "danger");
                    return;
                default:
                    break;
            }
        }

        render() {
            return (
                <div>
                    <WrappedComponent {...this.props} />

                    { /* Alert box*/}
                    <AlertBox
                        message={this.state.messageBox.text}
                        className={"alert alert-" + this.state.messageBox.level}
                        display={this.state.messageBox.show} />
                </div>
            )
        }
    }
}