import { observer } from "mobx-react";
import React from "react";
import { action, makeObservable, observable } from "mobx";
import { Button, Card, InputGroup } from "@blueprintjs/core";
import { countryKey } from "./common";
import { getLocalData, setLocalData } from "./localCrud";

const Contacts = observer( class Contacts extends React.Component {
    error = false;
    prevName = "";
    prevEmail = "";
    prevComment = "";

    constructor(props) {
        super(props);
        this.countryCode = this.props.searchParams.get(countryKey);
        this.localData = getLocalData(this.countryCode)
        this.contactList = this.localData?.contactList ?? [];
        this.currentContact = this.props.currentContact;
        this.index = this.localData.index;
        // this.name = this.currentContact.name;
        // this.email = this.currentContact.email;
        // this.comment = this.currentContact.comment;
        // this.editable = this.currentContact.editable;

        makeObservable(this, {
            currentContact:observable,
            countryCode:observable,
            error:observable,
            // name:observable,
            // email: observable,
            // comment:observable,
            // editable:observable,

            makeEditable:action.bound,
            updateName:action.bound,
            updateEmail:action.bound,
            updateComment:action.bound,
            saveChanges:action.bound,
            cancelChanges:action.bound,
        });
    }

    makeEditable() {
        this.currentContact.editable = true;
    }

    updateName(event) {
        this.currentContact.name = event.target.value;
    }

    updateEmail(event) {
        this.currentContact.email = event.target.value;

        // let { email } = this;

        if (!this.currentContact.email.includes('@')) {
            this.error = true;
        } else { this.error = false; }
    }

    updateComment(event) {
        this.currentContact.comment = event.target.value;
    }

    saveChanges() {
        this.currentContact.editable = false;
        this.currentContact.name = this.name;
        this.currentContact.email = this.email;
        this.currentContact.comment = this.comment;

        //this.contactList[this.index]
        setLocalData(this.countryCode, )
        localStorage.setItem(this.countryCode, JSON.stringify(this.currentContact));
    }

    cancelChanges() {
        this.editable = false;
        this.name = this.currentContact.name;
        this.email = this.currentContact.email;
        this.comment = this.currentContact.comment;
    }

    render() {
        let {
            error,
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
                    { currentContact.editable ?
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

                <div>Email: { currentContact.editable ?
                    <InputGroup
                        onChange={ updateEmail }
                        placeholder="Enter a valid email address"
                        value={ currentContact.email }
                        intent={ error ? "danger" : null} />
                    :
                    <p>{ currentContact.email }</p>
                }</div>

                <div>Comment: { currentContact.editable ?
                    <InputGroup onChange={ updateComment } placeholder="Comment" value={ currentContact.comment }></InputGroup>
                    :
                    <p>{ currentContact.comment }</p>
                }</div>

                <div align={"right"}>
                    { currentContact.editable ?
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