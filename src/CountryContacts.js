import React from "react";
import { observer } from "mobx-react";
import { Button, DialogBody } from "@blueprintjs/core";
import { action, makeObservable, observable } from "mobx";
import { contactKey,  } from "./common";
import Contacts from "./Contacts";

const CountryContacts = observer( class CountryContacts extends React.Component {
    editableContactId = undefined
    localData = this.props.getLocalData(this.props.countryCode)
    constructor(props) {
        super(props);
        console.log("Constructing country contacts")

        makeObservable(this, {
            editableContactId:observable,

            createContact:action.bound,
            setEditableContact:action.bound,
        });
    }

    createContact() {
        let { countryCode, updateSearchParams, addContact, getLocalData } = this.props

        addContact(countryCode)
        this.setEditableContact()
        this.localData = getLocalData(countryCode)
        console.log(this.localData)
        updateSearchParams({ editingContact: this.localData.previousContactIndex })
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
        console.log(localData)
        let {
            countryCode,
            searchParams,
            updateSearchParams,
            getLocalData,
            updateContact,
            deleteContact
        } = this.props

        console.log(localData)

        return (
            <div>
                { Object.entries(localData.contacts).map(([key, value]) => {
                    if (key !== searchParams.get(contactKey)) {
                        return (
                            <Contacts
                                key={ key }
                                index={ key }
                                currentContact={ value }
                                countryCode = { countryCode }
                                searchParams={ searchParams }
                                updateSearchParams={ updateSearchParams }
                                getLocalData={ getLocalData }
                                updateContact={ updateContact }
                                deleteContact={ deleteContact }
                            />
                        )
                    }
                })}
                { searchParams.get(contactKey) ?
                    <Contacts
                        key={ searchParams.get(contactKey) }
                        index={ searchParams.get(contactKey) }
                        currentContact={ localData.contacts[editableContactId] }
                        countryCode = { countryCode }
                        searchParams={ searchParams }
                        updateSearchParams={ updateSearchParams }
                        getLocalData={ getLocalData }
                        updateContact={ updateContact }
                        deleteContact={ deleteContact }
                    /> : <Button className="dialog-button" intent="success" onClick={ createContact }>+ Create new contact</Button>
                }
            </div>
        );
    }
})

export default CountryContacts;