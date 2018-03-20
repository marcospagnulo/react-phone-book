import React from 'react';
import MessageItem from './messageItem';

export default class MessageList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { messages: [] };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.messages !== nextProps.messages) {
            let messages = [...nextProps.messages];
            messages.forEach((m, index) => { m.open = false; });
            this.setState({ messages: messages });
        }
    }

    handleMessageSelection(message) {

        // Call paren handler
        this.props.handleMessageSelection(message);

        // Close all other items accordion
        let messages = this.state.messages.slice();
        const index = this.props.messages.findIndex((m) => { return m.id === message.id });
        messages.forEach((m, index) => {
            // Toggle only on selected item
            m.open = m.id === message.id ? !m.open : false;
        });
        this.setState({ messages: messages });
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
                    className={className}
                    message={message}
                    key={index} />
            ]
        });
        return list;
    }
}