import React from 'react';
import * as util from '../../util/util'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
     * Render month selector
     */
    renderDates() {
        let datesHtml = [];
        for (let i = 1; i < util.getDayPerMonths()[this.state.month] + 1; i++) {
            datesHtml = [
                ...datesHtml,
                <div
                    key={"date" + i}
                    className={(i === this.state.date ? "active " : "") + "calendar-dates-item p-3"}>
                    {i}
                    <div className="calendar-item-messages">
                        {this.renderCalendarDateMessages(i)}
                    </div>
                </div>
            ];
        }

        return datesHtml;
    }

    /**
     * Render incoming message in a particular day
     * 
     * @param {*} date - date to
     */
    renderCalendarDateMessages(date) {

        const day = new Date();
        day.setFullYear(this.state.year);
        day.setMonth(this.state.month);
        day.setDate(date);

        let messages = [];
        this.props.messages.forEach((message, index) => {
            const sentDate = new Date(message.sentDate);
            if (day.getDate() === sentDate.getDate() && day.getMonth() === sentDate.getMonth() && day.getFullYear() === sentDate.getFullYear()) {
                messages = [...messages, <i className="fas fa-comments"></i>];
            }
        })
        return (<div>{messages}</div>)
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
                {/* Dates*/}
                <div className="calendar-dates">
                    {this.renderDates()}
                </div>
            </div>
        )
    }
}

// Subscribe component to redux store and merge the state into component's props
function mapStateToProps(state) {
    return {
        messages: state.messages.messages,
        profile: state.profile.profile,
        contacts: state.contacts.contacts
    };
};

// connect method from react-router connects the component with redux store
export default withRouter(connect(mapStateToProps)(Calendar));