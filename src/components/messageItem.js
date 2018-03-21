import React from 'react';
import * as util from '../util/util'

export default class MessageItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({ expanded: false });
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.props.onClick(this.props.message);
        this.setState({
            height: this.refs.inner.clientHeight + 10 //adding 10px of margin top
        })
    }

    render() {
        const currentHeight = this.props.open ? this.state.height : 0;
        return (
            <div className={this.props.className} onClick={() => this.toggle()}>
                <i className="message-item-icon fas fa-user-circle fa-3x pr-3"></i>

                <div className={"message-item-from-at" + (this.props.message.read ? "" : " font-weight-bold")}>
                    <div className="pb-0">
                        <span className="message-item-from pr-1">From:</span>{this.props.message.fromNumber}
                    </div>
                    <div className="pb-0">
                        <span className="message-item-date">At: {util.formatDate(this.props.message.sentDate)}</span>
                    </div>
                </div>

                <div className="message-item-actions p-3">
                    <i className="fas fa-trash pr-3" onClick={(evt) => this.props.deleteMessage(evt, this.props.message.id)}></i>
                    <i className="fas fa-reply" onClick={(evt) => this.props.replyMessage(evt, this.props.message)}></i>
                </div>

                <div className="message-item-text" style={{ height: currentHeight + "px" }}>
                    <div className="message-item-text-inner" ref="inner">
                        {this.props.message.text}
                    </div>
                </div>
            </div>
        )
    }
}