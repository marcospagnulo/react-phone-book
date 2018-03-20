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
            height: this.refs.inner.clientHeight
        })
    }

    render() {
        const currentHeight = this.props.message.open ? this.state.height : 0;
        return (
            <div className={this.props.className} onClick={() => this.toggle()}>
                <i className="message-item-icon fas fa-user-circle fa-3x pr-3"></i>

                <div className="message-item-from-at">
                    <div className="pb-0">
                        <span className="message-item-from pr-1">From:</span>{this.props.message.fromNumber}
                    </div>
                    <div className="pb-0">
                        <span className="message-item-date">At: {util.formatDate(this.props.message.sentDate)}</span>
                    </div>
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