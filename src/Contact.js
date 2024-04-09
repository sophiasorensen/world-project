import { observer } from "mobx-react";
import React from "react";
import { action, computed, makeObservable, observable } from "mobx";
import { Button, Card, InputGroup } from "@blueprintjs/core";
import { editingContactKey } from "./common";
import ValidInputGroup from "./ValidInputGroup";

const Contact = observer( class Contacts extends React.Component {
    constructor(props) {
        super(props);

        this.currentContact = props.contact ??
            { name: "",
            email: "",
            comment: "" };
        this.editable = props.contactId === props.searchParams.get(editingContactKey)

        makeObservable(this, {
            currentContact:observable,
            editable:observable,

            isNameValid: computed,
            isEmailValid: computed,
            makeEditable: action.bound,
            updateName: action.bound,
            updateEmail: action.bound,
            updateComment: action.bound,
            saveChanges: action.bound,
            cancelChanges: action.bound,
            handleDelete: action.bound,
        });
    }

    get isNameValid() {
        return this.currentContact.name !== "";
    }

    get isEmailValid() {
        return this.currentContact.email.includes('@') || this.currentContact.email === "";
    }

    makeEditable() {
        this.props.updateSearchParams({ editingContact: this.props.contactId })
        this.editable = true;
    }

    updateName(event) {
        this.currentContact.name = event.target.value;
    }

    updateEmail(event) {
        this.currentContact.email = event.target.value;
    }

    updateComment(event) {
        this.currentContact.comment = event.target.value;
    }

    saveChanges() {
        let { contactId, countryCode, updateSearchParams, updateContact } = this.props

        this.editable = false;
        updateContact(countryCode, contactId, this.currentContact);
        updateSearchParams({ editingContact: null });
    }

    cancelChanges() {
        let { contactId, contact, countryCode, updateSearchParams, deleteContact } = this.props
        console.log(contact);

        this.editable = false;
        updateSearchParams({ editingContact: null });

        if (contact.name === "") {
            deleteContact(countryCode, contactId);
            return;
        }

        this.currentContact.name = contact.name;
        this.currentContact.email = contact.email;
        this.currentContact.comment = contact.comment;
    }

    handleDelete() {
        let { contactId, countryCode, deleteContact } = this.props;
        deleteContact(countryCode, contactId);
    }

    render() {
        let {
            editable,
            isNameValid,
            isEmailValid,
            currentContact,
            makeEditable,
            updateName,
            updateEmail,
            updateComment,
            saveChanges,
            cancelChanges,
            handleDelete
        } = this;

        return(
            <div>
                <Card interactive={ true }>
                    <div className="margin-below">Name:
                        { editable ?
                        <ValidInputGroup isError={ isNameValid }
                                         errorMessage="Name is required"
                                         onChange={ updateName }
                                         value={ currentContact.name }
                                         placeholder="Name"
                                         errorBelow
                                         /> :
                        <p>{ currentContact.name }</p>
                        }
                    </div>

                    <div className="margin-below">Email:
                        { editable ?
                        <ValidInputGroup isError={ isEmailValid }
                                         errorMessage="Email addresses must include @"
                                         onChange={ updateEmail }
                                         placeholder="Enter a valid email address"
                                         value={ currentContact.email }
                                         errorBelow
                                         /> :
                        <p>{ currentContact.email }</p>
                        }
                    </div>

                    <div className="margin-below">Comment:
                        { editable ?
                        <InputGroup onChange={ updateComment }
                                    placeholder="Comment"
                                    value={ currentContact.comment }
                                    /> :
                        <p>{ currentContact.comment }</p>
                        }
                    </div>

                    <div align={ "right" }>
                        { editable ?
                        <div align="right">
                            <Button className="card-button"
                                    text="Cancel"
                                    onClick={ cancelChanges }
                                    />
                            <Button className="card-button"
                                    text="Save"
                                    intent="primary"
                                    onClick={ saveChanges }
                                    disabled={ !(isNameValid && isEmailValid) }
                                    />
                        </div> :
                        <div align="right">
                            <Button className="card-button"
                                    text="Edit"
                                    onClick={ makeEditable }
                                    />
                            <Button className="card-button"
                                    text="Delete"
                                    intent="danger"
                                    onClick={ handleDelete }
                                    />
                        </div>
                        }
                    </div>
                </Card>
            </div>
        );
    }
})

export default Contact;