import { observer } from "mobx-react";
import React from "react";
import { action, computed, makeObservable, observable } from "mobx";
import { Button, Card, InputGroup } from "@blueprintjs/core";
import { contactKey, countryKey } from "./common";
import ValidInputGroup from "./ValidInputGroup";
import { empty } from "@apollo/client";

const Contact = observer( class Contacts extends React.Component {

    constructor(props) {
        super(props);
        this.currentContact = this.props.localData[this.props.countryCode].contacts[this.props.index] ??
            { name: "",
            email: "",
            comment: "" };
        this.editable = this.props.index == this.props.searchParams.get(contactKey)


        makeObservable(this, {
            currentContact:observable,
            editable:observable,

            isNameValid:computed,
            isEmailValid:computed,
            makeEditable:action.bound,
            updateName:action.bound,
            updateEmail:action.bound,
            updateComment:action.bound,
            saveChanges:action.bound,
            cancelChanges:action.bound,
            deleteContact:action.bound,
        });
    }

    get isNameValid() {
        return this.currentContact.name !== "";
    }

    get isEmailValid() {
        return this.currentContact.email.includes('@') || this.currentContact.email === "";
    }

    makeEditable() {
        this.props.updateSearchParams({ editingContact: this.props.index })
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
        let { index, countryCode, updateSearchParams, updateContact } = this.props

        this.editable = false;
        updateContact(countryCode, index, this.currentContact)
        updateSearchParams({ editingContact: null })
    }

    cancelChanges() {
        let { index, countryCode, updateSearchParams, deleteContact, localData } = this.props

        this.editable = false;
        updateSearchParams({ editingContact: null })
        if (localData[countryCode].contacts[index].name === "") {
            deleteContact(countryCode, index)
            return
        }

        this.currentContact.name = localData[countryCode].contacts[index].name;
        this.currentContact.email = localData[countryCode].contacts[index].email;
        this.currentContact.comment = localData[countryCode].contacts[index].comment;
    }

    deleteContact() {
        let { index, countryCode, deleteContact, getLocalData } = this.props

        deleteContact(countryCode, index);
        this.forceUpdate()
    }

    render() {
        let {
            editable,
            currentContact,
            isNameValid,
            isEmailValid,
            makeEditable,
            updateName,
            updateEmail,
            updateComment,
            saveChanges,
            cancelChanges,
            deleteContact
        } = this;

        let {
            localData,
            countryCode,
            index } = this.props

        return(
            <div>
            {
                index in localData[countryCode].contacts &&
                    <Card interactive={ true }>
                        <div>
                            { editable ?
                                <ValidInputGroup
                                    isError={ isNameValid }
                                    errorMessage="Name is required"
                                    onChange={ updateName }
                                    value={ currentContact.name }
                                    placeholder="Name"
                                />
                                :
                                <p>{ localData[countryCode].contacts[index].name }</p>
                            }
                        </div>

                        <div>Email: { editable ?
                            <ValidInputGroup
                                isError={ isEmailValid }
                                errorMessage="Email addresses must include @"
                                onChange={ updateEmail }
                                placeholder="Enter a valid email address"
                                value={ currentContact.email }
                            />
                            :
                            <p>{ localData[countryCode].contacts[index].email }</p>
                        }</div>

                        <div>Comment: { editable ?
                            <InputGroup onChange={ updateComment } placeholder="Comment"
                                        value={ currentContact.comment }></InputGroup>
                            :
                            <p>{ localData[countryCode].contacts[index].comment }</p>
                        }</div>

                        <div align={ "right" }>
                            { editable ?
                                <div align="right">
                                    <Button className="card-button" onClick={ cancelChanges }>Cancel</Button>
                                    <Button className="card-button"
                                            intent="primary"
                                            onClick={ saveChanges }
                                            disabled={
                                        !(isNameValid && isEmailValid)
                                    }>Save</Button>
                                </div>
                                :
                                <div align="right">
                                    <Button className="card-button" onClick={ makeEditable }>Edit</Button>
                                    <Button className="card-button" intent="danger"
                                            onClick={ deleteContact }>Delete</Button>
                                </div>
                            }
                        </div>
                    </Card>
            }
            </div>
        );
    }
})

export default Contact;