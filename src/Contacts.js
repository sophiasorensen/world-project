import { observer } from "mobx-react";
import React from "react";
import { action, makeObservable, observable } from "mobx";
import { Button, Card, InputGroup } from "@blueprintjs/core";
import { contactKey, countryKey } from "./common";
import { addOrUpdateContact, deleteContact, getLocalData, setLocalData } from "./localCrud";

const Contacts = observer( class Contacts extends React.Component {
    emailError = false;
    nameError = false;

    constructor(props) {
        super(props);
        console.log(this.props.countryCode)
        this.localData = getLocalData(this.props.countryCode)
        this.currentContact = this.localData.contacts[this.props.index] ??
            { name: "",
            email: "",
            comment: "" };
        this.editable = this.props.index == this.props.searchParams.get(contactKey)


        makeObservable(this, {
            currentContact:observable,
            emailError:observable,
            nameError:observable,
            editable:observable,
            localData:observable,

            makeEditable:action.bound,
            updateName:action.bound,
            updateEmail:action.bound,
            updateComment:action.bound,
            saveChanges:action.bound,
            cancelChanges:action.bound,
            deleteContact:action.bound,
        });
    }

    makeEditable() {
        this.props.updateSearchParams({ editingContact: this.props.index })
        this.editable = true;
    }

    updateName(event) {
        this.currentContact.name = event.target.value;
        if (this.currentContact.name === "") {
            this.nameError = true;
        } else { this.nameError = false; }
    }

    updateEmail(event) {
        this.currentContact.email = event.target.value;

        if (!this.currentContact.email.includes('@')) {
            this.emailError = true;
        } else { this.emailError = false; }
    }

    updateComment(event) {
        this.currentContact.comment = event.target.value;
    }

    saveChanges() {
        let { index, countryCode, updateSearchParams } = this.props

        this.editable = false;
        addOrUpdateContact(countryCode, index, this.currentContact)
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
            emailError,
            nameError,
            localData,
            editable,
            currentContact,
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
                        { nameError &&
                            <p className={ "error-text" }>
                                Name is required
                            </p>
                        }
                        <div>
                            { editable ?
                                <InputGroup
                                    onChange={ updateName }
                                    value={ currentContact.name }
                                    placeholder="Name"
                                    intent={ nameError ? "danger" : null }/>
                                :
                                <p>{ localData.contacts[index].name }</p>
                            }
                        </div>
                        { emailError &&
                            <p className={ "error-text" }>
                                Email addresses must include @
                            </p>
                        }

                        <div>Email: { editable ?
                            <InputGroup
                                onChange={ updateEmail }
                                placeholder="Enter a valid email address"
                                value={ currentContact.email }
                                intent={ emailError ? "danger" : null }/>
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
                                    <Button className="card-button" intent="primary" onClick={ saveChanges }
                                            disabled={ emailError || nameError }>Save</Button>
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