import React from 'react';
import MessageItem from './messageItem';

export default class MessageList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { accordion: {} };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.messages !== nextProps.messages) {
            let accordion = [...{}, ...this.state.accordion];
            this.props.messages.forEach((m, index) => {
                accordion[m.id] = accordion[m.id] !== null ? accordion[m.id] : false;
            });
            this.setState({ accordion: accordion });
        }
    }

    handleMessageSelection(message) {

        // Call paren handler
        this.props.handleMessageSelection(message);

        // Close all other items accordion
        const accordion = [...this.state.accordion];
        this.props.messages.forEach((m, index) => {
            // Toggle only on selected item
            accordion[m.id] = m.id === message.id ? !accordion[m.id] : false;
        });
        this.setState({ accordion: accordion });
    }

    render() {
        let list = [];
        this.props.messages.forEach((message, index) => {
            const active = this.props.message !== null && message.id === this.props.message.id;
            const className = "message-item list-group-item list-group-item-action " + (active ? "active" : "");
            list = [
                ...list,
                <MessageItem
                    onClick={() => this.handleMessageSelection(message)}
                    deleteMessage={this.props.deleteMessage}
                    replyMessage={this.props.replyMessage}
                    className={className}
                    message={message}
                    open={this.state.accordion[message.id]}
                    key={index} />
            ]
        });
        return list;
    }
}