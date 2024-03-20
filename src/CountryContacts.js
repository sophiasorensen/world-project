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
        this.localData = getLocalData(this.countryCode)

        makeObservable(this, {
            localData: observable,
            editableContactId:observable,

            createContact:action.bound,
            setEditableContact:action.bound,
        });
    }

    createContact() {
        let newIndex = this.localData.index + 1
        this.props.updateSearchParams({ editingContact: newIndex })
        addOrUpdateContact(this.countryCode, newIndex, { name:"", email:"", comment:""})
        this.setEditableContact()
    }

    setEditableContact() {
        this.editableContactId = this.props.searchParams.get(contactKey) ?? undefined;

    }

    render() {
        let {
            localData,
            editableContactId,
            createContact
        } = this;

        return (
            <DialogBody>
                <div>
                { Object.entries(localData.contacts).map(([key, value]) => {
                    if (key !== this.props.searchParams.get(contactKey)) {
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
                        currentContact={ localData.contacts[editableContactId] }
                        searchParams={ this.props.searchParams }
                        updateSearchParams={ this.props.updateSearchParams }
                    /> : <Button className="dialog-button" intent="success" onClick={ createContact }>+ Create new contact</Button>
                }

            </DialogBody>
        );
    }
})

export default CountryContacts;