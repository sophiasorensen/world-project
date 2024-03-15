import { observer } from "mobx-react";
import React from "react";
import { action, makeObservable, observable } from "mobx";
import { Button, Card, InputGroup } from "@blueprintjs/core";
import { contactKey, countryKey } from "./common";
import { addOrUpdateContact, deleteContact, getLocalData, setLocalData } from "./localCrud";

const Contacts = observer( class Contacts extends React.Component {
    error = false;

    constructor(props) {
        super(props);
        this.countryCode = this.props.searchParams.get(countryKey);
        this.localData = getLocalData(this.countryCode)
        this.contacts = this.localData.contacts ?? {}
        this.currentContact = this.props.currentContact ??
            { name: "",
            email: "",
            comment: "" };
        console.log(this.props.index)
        this.editable = this.props.index == this.props.searchParams.get(contactKey)


        makeObservable(this, {
            currentContact:observable,
            contacts:observable,
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
        console.log("name: " + event.target.value);
        this.currentContact.name = event.target.value;
    }

    updateEmail(event) {
        console.log("email: " + event.target.value);
        this.currentContact.email = event.target.value;

        if (!this.currentContact.email.includes('@')) {
            this.error = true;
        } else { this.error = false; }
    }

    updateComment(event) {
        console.log("comment: " + event.target.value);
        this.currentContact.comment = event.target.value;
    }

    saveChanges() {
        this.editable = false;
        addOrUpdateContact(this.countryCode, this.currentContact)
        this.localData = getLocalData(this.countryCode)
        this.props.updateSearchParams({ editingContact: null })
        console.log(this.localData)
    }

    cancelChanges() {
        this.editable = false;
        this.props.updateSearchParams({ editingContact: null })
        if (this.props.index > this.localData.index) {
            this.currentContact = null;
            return;
        }
        this.currentContact.name = this.contacts[this.props.index].name;
        this.currentContact.email = this.contacts[this.props.index].email;
        this.currentContact.comment = this.contacts[this.props.index].comment;
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