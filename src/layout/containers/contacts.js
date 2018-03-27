import React from 'react';
import ContactInfo from '../components/contact/contactInfo'
import * as contactActions from '../../store/actions/contactsActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ContactList from '../components/contact/contactList';
import { withReduxComponentRegistration } from '../../common/helper';


class Contacts extends React.Component {

    constructor(props) {

        super(props);

        // Bind functions
        this.handleContactSelection = this.handleContactSelection.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleDeleteContact = this.handleDeleteContact.bind(this);
        this.handleSubmitContact = this.handleSubmitContact.bind(this);
        this.newContact = this.newContact.bind(this);

        this.state = { editMode: false };
    }

    componentDidMount() {
        let contactId = this.props.match.params.contactId;
        if (contactId) {
            let contact = this.props.contacts.find((contact) => { return contact.id === parseInt(contactId, 10) });
            this.props.selectContactAction(contact);
        }
    }

    componentWillUnmount() {
        if (this.props.contact && !this.props.contact.id) {
            this.props.resetContactAction();
        }
    }

    /**
     * Manage the selection of a contact fromt the list
     * 
     * @param {*} contact 
     */
    handleContactSelection(contact) {
        if (this.props.contact == null || this.props.contact.id !== contact.id) {
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

    render() {

        return (
            <div className="row">

                {/* Left column */}
                <div className="w-25 p-3">

                    {/* Contact list */}
                    <div className="card">
                        <div className="card-header">
                            <h4 className="float-left">Contact list</h4>
                            {/* New Contact */}
                            <button onClick={() => this.newContact()} className="btn btn-primary float-right">
                                <i className="fas fa-plus p-1"></i><span>New contact</span>
                            </button>
                        </div>
                        <div className="list-group list-group-flush">
                            <ContactList
                                itemClassName="list-group-item list-group-item-action"
                                contact={this.props.contact}
                                contacts={this.props.contacts}
                                onContactSelection={this.handleContactSelection} />
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
        getContactsAction: contactActions.getContactsAction,
        selectContactAction: contactActions.selectContactAction,
        updateContactAction: contactActions.updateContactAction,
        submitContactAction: contactActions.submitContactAction,
        deleteContactAction: contactActions.deleteContactAction,
        resetContactAction: contactActions.resetContactAction
    }, dispatch);
}

const reduxCompoment = connect(mapStateToProps, matchDispatchToProps)(Contacts);
const routerComponent = withRouter(reduxCompoment);
export default withReduxComponentRegistration(routerComponent, contactActions.registerContactComponent);