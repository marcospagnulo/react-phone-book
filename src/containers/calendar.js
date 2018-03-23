import React from 'react';
import * as util from '../util/util'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CalendarDay from '../components/calendar/calendarDay';

class Calendar extends React.Component {

    constructor(props) {
        super(props);
        const now = new Date();
        this.state = { year: now.getFullYear(), month: now.getMonth(), date: now.getDate() }
    }

    handleSelectYear(year) {
        this.setState({ year: year })
    }

    handleSelectMonth(month) {
        this.setState({ month: month })
    }

    handleSelectDay(date) {
        this.setState({ date: date })
    }

    /**
     * Render year selector
     */
    renderYears() {
        const selectedYear = this.state.year;
        const years = [selectedYear - 1, selectedYear, selectedYear + 1];
        let yearsHtml = [];
        years.forEach((year, index) => {
            yearsHtml = [
                ...yearsHtml,
                <div
                    key={"year" + year}
                    onClick={() => this.handleSelectYear(year)}
                    className={(year === selectedYear ? "active " : "") + "calendar-years-item p-3"}>
                    {year}
                </div>
            ];
        })

        return yearsHtml;
    }

    /**
     * Render month selector
     */
    renderMonths() {
        const selectedMonth = this.state.month;
        const months = util.getMonths();
        let monthsHtml = [];
        months.forEach((month, index) => {
            monthsHtml = [
                ...monthsHtml,
                <div
                    key={"month" + index}
                    onClick={() => this.handleSelectMonth(index)}
                    className={(index === selectedMonth ? "active " : "") + "calendar-months-item p-3"}>{month}</div>
            ];
        })

        return monthsHtml;
    }

    /**
     * Render day of week
     */
    renderDayOfWeek() {
        const weekDays = util.getWeekDays();
        let weekDaysHtml = [];
        weekDays.forEach((day, index) => {
            weekDaysHtml = [
                ...weekDaysHtml,
                <div key={"day" + index} className="calendar-week-item p-3">
                    {day}
                </div>
            ];
        })

        return weekDaysHtml;
    }

    /**
     * Return the message received in a day
     * 
     * @param {*} date 
     */
    getMessageByDay(date) {

        const day = new Date();
        day.setFullYear(this.state.year);
        day.setMonth(this.state.month);
        day.setDate(date);

        let messages = [];
        this.props.messages.forEach((message, index) => {
            const sentDate = new Date(message.sentDate);
            if (util.areSameDay(day, sentDate)) {
                messages = [...messages, message];
            }
        })

        return messages;
    }

    /**
     * Return the events scheduled in a day
     *
     * @param {*} date
     */
    getEventsByDay(date) {
        return [];
    }

    /**
     * Render month selector
     */
    renderDates() {
        let datesHtml = [];
        for (let i = 1; i < util.getDayPerMonths()[this.state.month] + 1; i++) {
            datesHtml = [
                ...datesHtml,
                <CalendarDay
                    month={this.state.month}
                    year={this.state.year}
                    date={i}
                    events={this.getEventsByDay(i)}
                    messages={this.getMessageByDay(i)}
                    className={(i === this.props.date ? "active" : "")}
                    key={"date" + i} />
            ];
        }

        return datesHtml;
    }

    render() {
        return (
            <div>
                {/* Years */}
                <div className="calendar-years d-flex justify-content-center">
                    {this.renderYears()}
                </div>
                {/* Months */}
                <div className="calendar-months d-flex justify-content-center">
                    {this.renderMonths()}
                </div>
                {/* Day of week */}
                <div className="calendar-week d-flex justify-content-center">
                    {this.renderDayOfWeek()}
                </div>
                {/* Dates*/}
                <div className="calendar-dates d-flex flex-wrap">
                    {this.renderDates()}
                </div>
            </div>
        )
    }
}

// Subscribe component to redux store and merge the state into component's props
function mapStateToProps(state) {
    return {
        events: [],
        messages: state.messages.messages,
        profile: state.profile.profile,
        contacts: state.contacts.contacts
    };
};

// connect method from react-router connects the component with redux store
export default withRouter(connect(mapStateToProps)(Calendar));