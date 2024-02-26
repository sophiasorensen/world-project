import React from "react";
import { observer } from "mobx-react";
import { Button, DialogBody } from "@blueprintjs/core";
import { action, makeObservable, observable } from "mobx";
import { countryKey } from "./common";
import Contacts from "./Contacts";
import { getLocalData, setLocalData } from "./localCrud";

const CountryContacts = observer( class CountryContacts extends React.Component {
    editableContact = { name:"", email:"", comment:"", index:null }
    constructor(props) {
        super(props);
        this.countryCode = this.props.searchParams.get(countryKey);
        this.localData = getLocalData(this.countryCode) ?? setLocalData(this.countryCode);
        this.contactList = this.localData?.contactList ?? [];

        makeObservable(this, {
            localData: observable,
            contactList: observable,
            editableContact:observable,

            createContact:action.bound,
        });
    }

    createContact() {
        let { localData } = this;
        if (!localData) {
            setLocalData(this.countryCode);
        }
        this.props.updateSearchParams({ editingContact: localData.index + 1 })
        this.editableContact.index = localData.index + 1;
    }

    render() {
        let {
            localData,
            contactList,
            createContact,
            editableContact
        } = this;

        console.log("passing contact to edit, index: " + editableContact.index)

        return (
            <DialogBody>
                <div>{ contactList.map( (currentContact) =>
                    <Contacts
                        key={ localData.index }
                        currentContact={ currentContact }
                        searchParams={ this.props.searchParams }
                        updateSearchParams={ this.props.updateSearchParams }
                    />)}
                </div>
                { editableContact.index ?
                    <Contacts
                        key={ localData.index + 1 }
                        currentContact={ this.editableContact }
                        searchParams={ this.props.searchParams }
                        updateSearchParams={ this.props.updateSearchParams }
                    /> : <Button className="dialog-button" intent="success" onClick={ createContact }>+ Create new contact</Button>
                }

            </DialogBody>
        );
    }
})

export default CountryContacts;