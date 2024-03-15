import React from "react";
import { observer } from "mobx-react";
import { Button, DialogBody } from "@blueprintjs/core";
import { action, makeObservable, observable } from "mobx";
import { contactKey, countryKey } from "./common";
import Contacts from "./Contacts";
import { addOrUpdateContact, getLocalData, setLocalData } from "./localCrud";

const CountryContacts = observer( class CountryContacts extends React.Component {
    editableContactId = undefined
    constructor(props) {
        super(props);
        this.countryCode = this.props.searchParams.get(countryKey);
        this.localData = getLocalData(this.countryCode) ?? setLocalData(this.countryCode);
        console.log(this.localData)

        makeObservable(this, {
            localData: observable,
            editableContactId:observable,

            createContact:action.bound,
            setEditableContact:action.bound,
        });
    }

    createContact() {
        let localData = getLocalData(this.countryCode)
        this.props.updateSearchParams({ editingContact: localData.index + 1 })
        addOrUpdateContact(this.countryCode, this.props.searchParams.get(contactKey), { name:"", email:"", comment:""})
        this.setEditableContact()
    }

    setEditableContact() {
        this.editableContactId = this.props.searchParams.get(contactKey) ?? undefined;

    }

    render() {
        this.setEditableContact();

        let {
            editableContactId,
            createContact
        } = this;

        console.log("passing contact to edit, index: " + editableContactId)
        let localData = getLocalData(this.countryCode)
        let contacts = localData.contacts ?? {};
        console.log("printing contacts")
        console.log(JSON.parse(JSON.stringify(contacts)))

        return (
            <DialogBody>
                <div>
                { Object.entries(contacts).map(([key, value]) => {
                    if (key !== this.props.searchParams.get(contactKey)) {
                        console.log("printing contact " + key)
                        return (
                            <Contacts
                                key={ key }
                                index={ key }
                                currentContact={ value }
                                searchParams={ this.props.searchParams }
                                updateSearchParams={ this.props.updateSearchParams }
                            />
                        )
                    }
                })}
                </div>
                { this.props.searchParams.get(contactKey) ?
                    <Contacts
                        key={ this.props.searchParams.get(contactKey) }
                        index={ this.props.searchParams.get(contactKey) }
                        currentContact={ contacts[editableContactId] }
                        searchParams={ this.props.searchParams }
                        updateSearchParams={ this.props.updateSearchParams }
                    /> : <Button className="dialog-button" intent="success" onClick={ createContact }>+ Create new contact</Button>
                }

            </DialogBody>
        );
    }
})

export default CountryContacts;