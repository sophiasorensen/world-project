import { observer } from "mobx-react";
import React from "react";
import { action, makeObservable, observable } from "mobx";
import { Button, Card, InputGroup } from "@blueprintjs/core";
import { contactKey, countryKey } from "./common";
import { addContact, deleteContact, getLocalData, setLocalData } from "./localCrud";

const Contacts = observer( class Contacts extends React.Component {
    error = false;

    constructor(props) {
        super(props);
        this.countryCode = this.props.searchParams.get(countryKey);
        this.localData = getLocalData(this.countryCode)
        console.log("initializing local Data")
        console.log(this.localData)
        this.currentContact = this.props.currentContact ??
            { name: "",
            email: "",
            comment: "",
            index: this.localData.index + 1 };
        console.log("contact in edit mode:" + this.props.searchParams.get(contactKey))
        console.log("size of contact list: " + this.localData.contactList.length)
        console.log("last index in list: " + this.localData.index)
        console.log("currentContact index == searchParams index --> " + (this.currentContact.index == this.props.searchParams.get(contactKey)))
        this.editable = this.currentContact.index == this.props.searchParams.get(contactKey)


        makeObservable(this, {
            currentContact:observable,
            countryCode:observable,
            error:observable,
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
        this.props.updateSearchParams({ editingContact: this.currentContact.index })
        this.editable = true;
    }

    updateName(event) {
        this.currentContact.name = event.target.value;
    }

    updateEmail(event) {
        this.currentContact.email = event.target.value;

        if (!this.currentContact.email.includes('@')) {
            this.error = true;
        } else { this.error = false; }
    }

    updateComment(event) {
        this.currentContact.comment = event.target.value;
    }

    saveChanges() {
        this.editable = false;
        addContact(this.countryCode, this.currentContact)
        this.localData = getLocalData(this.countryCode)
        this.props.updateSearchParams({ editingContact: null })
        console.log(this.localData)
    }

    cancelChanges() {
        this.editable = false;
        this.props.updateSearchParams({ editingContact: null })
        if (this.currentContact.index > this.localData.index) {
            this.currentContact = null;
            return;
        }
        let storedContact = this.localData.contactList.find(contact => contact.index === this.currentContact.index);
        this.currentContact.name = storedContact.name;
        this.currentContact.email = storedContact.email;
        this.currentContact.comment = storedContact.comment;
    }

    deleteContact() {
        deleteContact(this.countryCode, this.currentContact.index);
    }

    render() {
        let {
            error,
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

        console.log(error)

        return(
            <Card interactive={ true }>
                <div>
                    { editable ?
                        <InputGroup onChange={ updateName } value={ currentContact.name } placeholder="Name" />
                        :
                        <p>{ currentContact.name }</p>
                    }
                </div>
                { error &&
                    <p className={ "error-text" }>
                        Email addresses must include @
                    </p>
                }

                <div>Email: { editable ?
                    <InputGroup
                        onChange={ updateEmail }
                        placeholder="Enter a valid email address"
                        value={ currentContact.email }
                        intent={ error ? "danger" : null} />
                    :
                    <p>{ currentContact.email }</p>
                }</div>

                <div>Comment: { editable ?
                    <InputGroup onChange={ updateComment } placeholder="Comment" value={ currentContact.comment }></InputGroup>
                    :
                    <p>{ currentContact.comment }</p>
                }</div>

                <div align={"right"}>
                    { editable ?
                        <div align="right">
                            <Button className="card-button" onClick={ cancelChanges }>Cancel</Button>
                            <Button className="card-button" intent="primary" onClick={ saveChanges } disabled={ error }>Save</Button>
                        </div>
                         :
                        <div align="right">
                            <Button className="card-button" onClick={ makeEditable }>Edit</Button>
                            <Button className="card-button" intent="danger" onClick={ deleteContact }>Delete</Button>
                        </div>
                    }
                </div>
            </Card>
        );
    }
})

export default Contacts;