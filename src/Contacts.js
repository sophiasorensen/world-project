import { observer } from "mobx-react";
import React from "react";
import { action, computed, makeObservable, observable } from "mobx";
import { Button, Card, InputGroup } from "@blueprintjs/core";
import { contactKey, countryKey } from "./common";
import { updateContact, deleteContact, getLocalData } from "./localCrud";
import ValidInputGroup from "./ValidInputGroup";
import { empty } from "@apollo/client";

const Contacts = observer( class Contacts extends React.Component {

    constructor(props) {
        super(props);
        this.localData = getLocalData(this.props.countryCode)
        this.currentContact = this.localData.contacts[this.props.index] ??
            { name: "",
            email: "",
            comment: "" };
        this.editable = this.props.index == this.props.searchParams.get(contactKey)


        makeObservable(this, {
            currentContact:observable,
            editable:observable,
            localData:observable,

            isNameValid:action.bound,
            isEmailValid:action.bound,
            makeEditable:action.bound,
            updateName:action.bound,
            updateEmail:action.bound,
            updateComment:action.bound,
            saveChanges:action.bound,
            cancelChanges:action.bound,
            deleteContact:action.bound,
        });
    }

    isNameValid(name) {
        return name !== "";
    }

    isEmailValid(email) {
        return email.includes('@');
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
        let { index, countryCode, updateSearchParams } = this.props

        this.editable = false;
        updateContact(countryCode, index, this.currentContact)
        updateSearchParams({ editingContact: null })
    }

    cancelChanges() {
        let { index, countryCode, updateSearchParams } = this.props

        this.editable = false;
        updateSearchParams({ editingContact: null })
        if (this.localData.contacts[index].name === "") {
            deleteContact(countryCode, index)
            this.localData = getLocalData(countryCode)
            return
        }

        this.currentContact.name = this.localData.contacts[index].name;
        this.currentContact.email = this.localData.contacts[index].email;
        this.currentContact.comment = this.localData.contacts[index].comment;
    }

    deleteContact() {
        let { index, countryCode } = this.props

        deleteContact(countryCode, index);
        this.localData = getLocalData(countryCode)
    }

    render() {
        let {
            localData,
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

        let { index } = this.props

        return(
            <div>
            {
                index in localData.contacts &&
                    <Card interactive={ true }>
                        <div>
                            { editable ?
                                <ValidInputGroup
                                    errorPredicate={ isNameValid }
                                    errorMessage="Name is required"
                                    onChange={ updateName }
                                    value={ currentContact.name }
                                    placeholder="Name"
                                />
                                :
                                <p>{ localData.contacts[index].name }</p>
                            }
                        </div>

                        <div>Email: { editable ?
                            <ValidInputGroup
                                errorPredicate={ isEmailValid }
                                errorMessage="Email addresses must include @"
                                onChange={ updateEmail }
                                placeholder="Enter a valid email address"
                                value={ currentContact.email }
                            />
                            :
                            <p>{ localData.contacts[index].email }</p>
                        }</div>

                        <div>Comment: { editable ?
                            <InputGroup onChange={ updateComment } placeholder="Comment"
                                        value={ currentContact.comment }></InputGroup>
                            :
                            <p>{ localData.contacts[index].comment }</p>
                        }</div>

                        <div align={ "right" }>
                            { editable ?
                                <div align="right">
                                    <Button className="card-button" onClick={ cancelChanges }>Cancel</Button>
                                    <Button className="card-button"
                                            intent="primary"
                                            onClick={ saveChanges }
                                            disabled={
                                        !(isNameValid(currentContact.name) && isEmailValid(currentContact.email))
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

export default Contacts;