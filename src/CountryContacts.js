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
        this.localData = getLocalData(this.props.countryCode)

        makeObservable(this, {
            localData: observable,
            editableContactId:observable,

            createContact:action.bound,
            setEditableContact:action.bound,
        });
    }

    createContact() {
        let { localData } = this
        let { countryCode, updateSearchParams } = this.props

        let newIndex = localData.index + 1
        updateSearchParams({ editingContact: newIndex })
        addOrUpdateContact(countryCode, newIndex, { name:"", email:"", comment:""})
        this.setEditableContact()
        this.localData = getLocalData(countryCode)
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
        let {
            countryCode,
            searchParams,
            updateSearchParams
        } = this.props

        return (
            <DialogBody>
                <div>
                { Object.entries(localData.contacts).map(([key, value]) => {
                    console.log("do not print contact " + searchParams.get(contactKey))
                    if (key !== searchParams.get(contactKey)) {
                        console.log("rendering contact " + key)
                        return (
                            <Contacts
                                key={ key }
                                index={ key }
                                currentContact={ value }
                                countryCode = { countryCode }
                                searchParams={ searchParams }
                                updateSearchParams={ updateSearchParams }
                            />
                        )
                    }
                })}
                </div>
                { searchParams.get(contactKey) ?
                    <Contacts
                        key={ searchParams.get(contactKey) }
                        index={ searchParams.get(contactKey) }
                        currentContact={ localData.contacts[editableContactId] }
                        countryCode = { countryCode }
                        searchParams={ searchParams }
                        updateSearchParams={ updateSearchParams }
                    /> : <Button className="dialog-button" intent="success" onClick={ createContact }>+ Create new contact</Button>
                }

            </DialogBody>
        );
    }
})

export default CountryContacts;