import { observer } from "mobx-react";
import React from "react";
import { action, makeObservable, observable } from "mobx";
import { Button, Card, InputGroup } from "@blueprintjs/core";
import { countryKey } from "./common";
import { addContact, getLocalData, setLocalData } from "./localCrud";

const Contacts = observer( class Contacts extends React.Component {
    error = false;

    constructor(props) {
        super(props);
        this.countryCode = this.props.searchParams.get(countryKey);
        this.localData = getLocalData(this.countryCode)
        this.contactList = this.localData?.contactList ?? [];
        this.currentContact = this.props.currentContact ??
            { name: "",
            email: "",
            comment: "",
            index: this.localData.index + 1 };
        this.editable = this.currentContact.index === this.props.searchParams.editingContact


        makeObservable(this, {
            currentContact:observable,
            countryCode:observable,
            error:observable,
            editable:observable,

            makeEditable:action.bound,
            updateName:action.bound,
            updateEmail:action.bound,
            updateComment:action.bound,
            saveChanges:action.bound,
            cancelChanges:action.bound,
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
        this.props.updateSearchParams({ editingContact: null })
        addContact(this.countryCode, this.currentContact)
    }

    cancelChanges() {
        this.props.updateSearchParams({ editingContact: null })
        let storedContact = this.localData.contactList.find(contact => contact.index === this.currentContact.index);
        this.currentContact.name = storedContact.name;
        this.currentContact.email = storedContact.email;
        this.currentContact.comment = storedContact.comment;
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
            cancelChanges
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
                            <Button className="card-button" intent="error">Delete</Button>
                        </div>
                    }
                </div>
            </Card>
        );
    }
})

export default Contacts;