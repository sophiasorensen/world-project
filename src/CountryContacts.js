import React from "react";
import { observer } from "mobx-react";
import { Button } from "@blueprintjs/core";
import { action, makeObservable, observable } from "mobx";
import { contactKey } from "./common";
import Contact from "./Contact";

const CountryContacts = observer( class CountryContacts extends React.Component {
    editableContactId = undefined


    constructor(props) {
        super(props);

        makeObservable(this, {
            editableContactId:observable,

            createContact:action.bound,
            setEditableContact:action.bound,
        });
    }

    createContact() {
        let { countryCode, updateSearchParams, localData, addContact, getLocalData } = this.props

        addContact(countryCode)
        this.setEditableContact()
        updateSearchParams({ editingContact: localData[countryCode].previousContactIndex })
    }

    setEditableContact() {
        this.editableContactId = this.props.searchParams.get(contactKey) ?? undefined;

    }

    render() {
        let {
            editableContactId,
            createContact
        } = this;

        let {
            localData,
            countryCode,
            searchParams,
            updateSearchParams,
            updateContact,
            deleteContact
        } = this.props

        return (
            <div>
                { Object.entries(localData[countryCode].contacts).map(([key, value]) => {
                    if (key !== searchParams.get(contactKey)) {
                        return (
                            <Contact
                                key={ key }
                                index={ key }
                                currentContact={ value }
                                countryCode = { countryCode }
                                searchParams={ searchParams }
                                updateSearchParams={ updateSearchParams }
                                localData={ localData }
                                updateContact={ updateContact }
                                deleteContact={ deleteContact }
                            />
                        )
                    }
                })}

                { searchParams.get(contactKey) ?
                    <Contact
                        key={ searchParams.get(contactKey) }
                        index={ searchParams.get(contactKey) }
                        currentContact={ localData[countryCode].contacts[editableContactId] }
                        countryCode = { countryCode }
                        searchParams={ searchParams }
                        updateSearchParams={ updateSearchParams }
                        localData={ localData }
                        updateContact={ updateContact }
                        deleteContact={ deleteContact }
                    /> : <Button className="dialog-button" intent="success" onClick={ createContact }>+ Create new contact</Button>
                }
            </div>
        );
    }
})

export default CountryContacts;