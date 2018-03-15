import React from 'react';

export default class AlertBox extends React.Component {

    render() {
        return (
            <div id="alertbox" className={this.props.display ? "down" : "up"}>
                <div className={"alert-box-inner alert " + this.props.className} role="alert">
                    {this.props.message}
                </div>
            </div>
        )
    }
}