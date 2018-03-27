import React from 'react';
import Calendar from '../containers/calendar';


export default class Home extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="w-100 p-3">
                    <Calendar showMessageBox={this.props.showMessageBox} />
                </div>
            </div>
        )
    }
}