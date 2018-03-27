import React from 'react';

export default class ContactList extends React.Component {

    constructor(props) {
        super(props);
        props.contacts.forEach((contact, index) => {
            contact.badgeColor = this.getRandomColor();
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.contacts !== nextProps.contacts && nextProps.contacts.length > 0) {
            nextProps.contacts.forEach((contact, index) => {
                contact.badgeColor = this.getRandomColor();
            });
        }
    }

    getRandomColor() {
        const colors = ["red", "purple", "green", "orange", "brown", "red", "purple", "green", "orange", "brown"];
        const index = parseInt(Math.random() * 10, 10);
        return colors[index];
    }

    render() {
        let list = [];
        this.props.contacts.forEach((contact, index) => {
            const active = this.props.contact && contact.id === this.props.contact.id;
            const className = this.props.itemClassName + (active ? " active" : "");
            list = [
                ...list,
                <button
                    onClick={() => this.props.onContactSelection(contact)}
                    className={className}
                    key={index}>
                    <div className={contact.badgeColor + " contact-list-item-badge"} style={{ backgroundColor: contact.badgeColor }}>
                        {contact.surname[0]}{contact.name[0]}
                    </div>
                    <span className="pl-3">{contact.surname} {contact.name}</span>
                </button>
            ]
        });
        return (
            <div className={this.props.className}>
                {list}
            </div>
        );
    }

}
