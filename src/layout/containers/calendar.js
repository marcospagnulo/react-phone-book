import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CalendarDay from '../components/calendar/calendarDay';
import EventForm from '../components/calendar/eventForm';
import * as eventActions from '../../store/actions/eventActions';
import * as util from '../../common/util'
import { withReduxComponentRegistration } from '../../common/helper';

class Calendar extends React.Component {

    constructor(props) {

        super(props);

        this.handleContactSelection = this.handleContactSelection.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmitEvent = this.handleSubmitEvent.bind(this);
        this.handleClose = this.handleClose.bind(this);

        const now = new Date();
        this.state = { year: now.getFullYear(), month: now.getMonth(), date: now.getDate(), showSubmit: false }
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

        const day = new Date();
        day.setFullYear(this.state.year);
        day.setMonth(this.state.month);
        day.setDate(date);

        let events = [];
        this.props.events.forEach((event, index) => {
            const eventDate = new Date(event.date);
            if (util.areSameDay(day, eventDate)) {
                events = [...events, event];
            }
        })

        return events;
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
                    newEvent={(evt) => this.newEvent(evt, i)}
                    month={this.state.month}
                    year={this.state.year}
                    date={i}
                    events={this.getEventsByDay(i)}
                    messages={this.getMessageByDay(i)}
                    className={(i === this.state.date ? "active" : "")}
                    key={"date" + i} />
            ];
        }

        return datesHtml;
    }

    /**
     * Reset the field of submit event form
     */
    newEvent(evt, date) {
        evt.stopPropagation();
        this.setState({ showSubmit: true, eventDate: date });
    }

    /**
     * Manage the field value changes updatind the message in the store
     * 
     * @param {*} event - event fired by input component
     */
    handleFieldChange(event) {

        // Retrieve value and input name
        const target = event.target;
        const fieldValue = target.type === 'checkbox' ? target.checked : target.value;
        const fieldName = target.name;

        // Storing input into component state
        this.setState({ [fieldName]: fieldValue });
    }

    /**
     * Submit the form to the message service
     */
    handleSubmitEvent() {

        const eventDate = new Date();
        eventDate.setDate(this.state.eventDate);
        eventDate.setMonth(this.state.month);
        eventDate.setFullYear(this.state.year);

        this.props.submitEventAction({
            "userId": this.props.profile.id,
            "contactId": this.state.contact.id,
            "title": this.state.title,
            "description": this.state.description,
            "date": eventDate.getTime()
        });

        this.handleClose();
    }

    /**
     * Store in component state the selected contact
     * 
     * @param {*} contact 
     */
    handleContactSelection(contact) {
        this.setState({ contact: contact });
    }

    /**
     * Close submit event form modal
     */
    handleClose() {
        this.setState({ conctact: null, title: "", description: "", eventDate: null, showSubmit: false });
    }

    render() {
        return (
            <div className="calendar-container">
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
                {
                    this.state.showSubmit ?
                        <EventForm
                            contacts={this.props.contacts}
                            onFieldChange={this.handleFieldChange}
                            onSubmitEvent={this.handleSubmitEvent}
                            onContactSelection={this.handleContactSelection}
                            onClose={this.handleClose}
                            contact={this.state.contact} />
                        : null
                }
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getMessagesAction: eventActions.getEventsAction,
        selectEventAction: eventActions.selectEventAction,
        submitEventAction: eventActions.submitEventAction,
        deleteEventAction: eventActions.deleteEventAction
    }, dispatch);
}

// Subscribe component to redux store and merge the state into component's props
function mapStateToProps(state) {
    return {
        messages: state.messages.messages,
        profile: state.profile.profile,
        contacts: state.contacts.contacts,
        events: state.event.events
    };
};

const reduxCompoment = connect(mapStateToProps, matchDispatchToProps)(Calendar);
const routerComponent = withRouter(reduxCompoment);
export default withReduxComponentRegistration(routerComponent, eventActions.registerEventComponent);