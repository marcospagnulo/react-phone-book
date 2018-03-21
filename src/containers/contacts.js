import React from 'react';
import ContactInfo from '../components/contactInfo'
import * as contactActions from '../store/actions/contactsActions';
import * as types from '../store/actionTypes';
import { history } from '../store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class Contacts extends React.Component {

    constructor(props) {

        super(props);

        // Bind functions
        this.handleContactSelection = this.handleContactSelection.bind(this);
        this.renderContactList = this.renderContactList.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleDeleteContact = this.handleDeleteContact.bind(this);
        this.handleSubmitContact = this.handleSubmitContact.bind(this);
        this.newContact = this.newContact.bind(this);

        this.state = { editMode: false };
    }

    componentDidMount() {
        this.props.registerContactComponent(this); // Registering component to the reducer for listening action callbacks
    }

    componentWillUnmount() {
        if (!this.props.contact.id) {
            this.props.resetContactAction();
        }
    }

    componentWillReceiveProps(nextProps) {

        const urlParams = nextProps.location.pathname.split('/');

        // Load the contact if param contact id is declared in url and no contact is currently loaded
        const urlHasContactId = urlParams.length > 2;
        const contactListLoaded = nextProps.contacts.length > 0 || this.props.contacts.length > 0;
        const noContactLoadead = this.props.contact === null;
        const urlChanged = this.props.location !== nextProps.location;

        if (urlHasContactId && contactListLoaded && noContactLoadead || (urlChanged && urlHasContactId)) {
            let contactId = urlParams[2];
            let contact = nextProps.contacts.find((contact) => { return contact.id === parseInt(contactId, 10) });
            this.props.selectContactAction(contact);
        }
    }

    /**
     * Function called by the reducer as a callback of some actions
     * 
     * @param {*} actionType 
     */
    actionDispatched(actionType) {

        switch (actionType) {
            case types.SUBMIT_CONTACT_SUCCESS:
                this.props.showMessageBox("Contact submit succuessfully", "success");
                break;
            case types.SUBMIT_CONTACT_ERROR:
                this.props.showMessageBox("Unable to submit contact due to an error", "danger");
                break;
            case types.DELETE_CONTACT_SUCCESS:
                this.props.showMessageBox("Contact deleted succuessfully", "success");
                break;
            case types.DELETE_CONTACT_ERROR:
                this.props.showMessageBox("Unable to delete contact due to an error", "danger");
                break;
            case types.GET_CONTACTS_ERROR:
                this.props.showMessageBox("Unable to get contacts due to an error", "danger");
                break;
            default:
                break;
        }
    }

    /**
     * Manage the selection of a contact fromt the list
     * 
     * @param {*} contact 
     */
    handleContactSelection(contact) {
        if (this.props.contact == null || this.props.contact.id !== contact.id) {
            history.push("/contacts/" + contact.id);
            this.props.selectContactAction(contact);
        }
    }

    /**
     * Manage the field value changes updatind the contact in the store
     * 
     * @param {*} event - event fired by input component
     */
    handleFieldChange(event) {

        // Retrieve value and input name
        const target = event.target;
        const fieldValue = target.type === 'checkbox' ? target.checked : target.value;
        const fieldName = target.name;

        this.props.contact[fieldName] = fieldValue;
        this.props.updateContactAction(this.props.contact);
    }

    /**
     * Submit the form to the contact service
     */
    handleSubmitContact() {
        this.props.submitContactAction({ userId: this.props.profile.id, contact: this.props.contact });
    }

    /**
     * Call the action for deleting a contact
     */
    handleDeleteContact() {
        this.props.deleteContactAction({ userId: this.props.profile.id, contactId: this.props.contact.id });
    }

    /**
     * Invert the edit mode of the contact form
     */
    toggleEditMode() {
        this.setState({ editMode: !this.state.editMode })
    }

    /**
     * Clear all the inputs inside the form
     */
    resetForm() {
        this.props.selectContactAction({
            address: "",
            email: "",
            id: null,
            mobile: "",
            name: "",
            password: "",
            surname: ""
        });
    }

    /**
     * Create a new contact form
     */
    newContact() {
        this.setState({ editMode: true });
        this.resetForm();
    }

    renderContactList() {
        let list = [];
        this.props.contacts.forEach((contact, index) => {
            const active = this.props.contact !== null && contact.id === this.props.contact.id;
            const className = "list-group-item list-group-item-action " + (active ? "active" : "");
            list = [
                ...list,
                <button
                    onClick={this.handleContactSelection.bind(this, contact)}
                    className={className}
                    key={index}>
                    {contact.surname} {contact.name}
                </button>
            ]
        });
        return list;
    }

    render() {

        return (
            <div className="row">

                {/* Left column */}
                <div className="w-25 p-3">

                    {/* Contact list */}
                    <div className="card">
                        <div className="card-header">
                            <h5 className="float-left">Contact list</h5>
                            {/* New Contact */}
                            <button onClick={() => this.newContact()} className="btn btn-primary float-right">
                                <i className="fas fa-plus p-1"></i><span>New contact</span>
                            </button>
                        </div>
                        <div className="list-group list-group-flush">
                            {this.renderContactList()}
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="w-75 p-3">
                    {
                        <ContactInfo
                            contact={this.props.contact}
                            editMode={this.state.editMode}
                            toggleEditMode={this.toggleEditMode}
                            handleFieldChange={this.handleFieldChange}
                            handleDeleteContact={this.handleDeleteContact}
                            handleSubmitContact={this.handleSubmitContact} />
                    }
                </div>
            </div>
        );
    }
}

// Subscribe component to redux store and merge the state into component's props
function mapStateToProps(state) {
    return {
        contacts: state.contacts.contacts,
        contact: state.contacts.contact,
        profile: state.profile.profile
    };
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        registerContactComponent: contactActions.registerContactComponent,
        getContactsAction: contactActions.getContactsAction,
        selectContactAction: contactActions.selectContactAction,
        updateContactAction: contactActions.updateContactAction,
        submitContactAction: contactActions.submitContactAction,
        deleteContactAction: contactActions.deleteContactAction,
        resetContactAction: contactActions.resetContactAction
    }, dispatch);
}

// connect method from react-router connects the component with redux store
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Contacts));