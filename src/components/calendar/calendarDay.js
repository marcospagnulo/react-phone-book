import React from 'react';
import { history } from '../../store/index';

export default class CalendarDay extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showDetail: false };
        this.toggleDetail = this.toggleDetail.bind(this);
    }

    /**
     * Render the events (messages, appointments) in a particular day
     * 
     * @param {*} date - date to
     */
    renderCalendarDateEvents() {

        // check for message received in current date
        let messages = [];
        this.props.messages.forEach((message, index) => {
            messages = [
                ...messages,
                <div
                    key={"message" + index}
                    className="calendar-date-item-event"
                    onClick={() => history.push("/messages/" + message.id)}>
                    <i className="fas fa-comments pr-2"></i>{message.text}
                </div>
            ];
        })

        // check for events scheduled in current date
        let events = [];
        this.props.events.forEach((event, index) => {
            events = [
                ...events,
                <div
                    key={"event" + index}
                    className="calendar-date-item-event">
                    <i className="fas fa-calendar pr-2"></i>{event.title}
                </div>
            ];
        })

        return (<div>{messages}{events}</div>)
    }

    /**
     * Render the number of message received and events scheduled in a day
     * 
     * @param {*} date 
     */
    renderEventsCounter() {
        return (
            <div>
                {
                    this.props.messages.length > 0 ?
                        <div className="calendar-date-item-event">
                            <i className="fas fa-comments pr-2"></i>{this.props.messages.length}
                        </div>
                        : null
                }
                {
                    this.props.events.length > 0 ?
                        <div className="calendar-date-item-event">
                            <i className="fas fa-calendar pr-2"></i>{this.props.events.length}
                        </div>
                        : null
                }
            </div>
        )
    }

    /**
     * Toggle the visibility of a detail nested in a day
     * 
     * @param {*} evt 
     * @param {*} toggle 
     */
    toggleDetail(evt, toggle) {
        evt.stopPropagation();
        this.setState({ showDetail: toggle })
    }

    hasEvent() {
        return this.props.messages.length > 0 || this.props.events.length > 0;
    }

    render() {
        return (
            <div
                onClick={(evt) => this.toggleDetail(evt, true)}
                className={this.props.className + " calendar-dates-item p-3"}>

                {/* Date */}
                <div className="calendar-item-day pb-1">{this.props.date}</div>

                {/* Message Counter*/}
                {this.renderEventsCounter()}

                {/* Date events detail */}
                <div className={"calendar-item-day-detail p-3 " + (this.state.showDetail && this.hasEvent() > 0 ? "show" : "hide")}>
                    <button type="button" className="close" aria-label="Close" onClick={(evt) => this.toggleDetail(evt, false)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="clearfix"></div>
                    {this.renderCalendarDateEvents()}
                </div>

                {/* Add event */}
                <i className="calendar-item-action p-3 fas fa-plus fa-lg" onClick={(evt) => this.props.newEvent(evt, this.props.date)}></i>

            </div>
        )
    }
}