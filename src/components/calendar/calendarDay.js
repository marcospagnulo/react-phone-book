import React from 'react';
import * as util from '../../util/util'
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

        let messages = [];
        this.props.messages.forEach((message, index) => {
            messages = [
                ...messages,
                <div className="calendar-date-item-event"
                    onClick={() => history.push("/messages/" + message.id)}>
                    <i key={"message" + index} className="fas fa-comments pr-2"></i>{message.text}
                </div>
            ];
        })
        return (<div>{messages}</div>)
    }

    /**
     * Render the number of message in a day
     * 
     * @param {*} date 
     */
    renderMessageCounter(date) {

        const day = new Date();
        day.setFullYear(this.props.year);
        day.setMonth(this.props.month);
        day.setDate(date);

        let counter = 0;
        this.props.messages.forEach((message, index) => {
            const sentDate = new Date(message.sentDate);
            if (util.areSameDay(day, sentDate)) {
                counter++;
            }
        })
        return (
            counter > 0 ?
                <div className="calendar-date-item-event">
                    <i className="fas fa-comments pr-2"></i>{counter}
                </div>
                : null
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

    render() {
        return (
            <div
                onClick={(evt) => this.toggleDetail(evt, true)}
                className={this.props.className + " calendar-dates-item p-3"}>

                {/* Date */}
                <div className="calendar-item-day pb-1">{this.props.date}</div>

                {/* Message Counter*/}
                {this.renderMessageCounter(this.props.date)}
                {
                    /* Date events detail */
                    <div className={"calendar-item-day-detail p-3 " + (this.state.showDetail && this.props.messages.length > 0 ? "show" : "hide")}>
                        <button type="button" className="close" aria-label="Close" onClick={(evt) => this.toggleDetail(evt, false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div className="clearfix"></div>
                        {this.renderCalendarDateEvents()}
                    </div>
                }
            </div>
        )
    }
}