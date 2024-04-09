import React from "react";
import { observer } from "mobx-react";
import { Button } from "@blueprintjs/core";
import { action, makeObservable } from "mobx";
import Contact from "./Contact";
import { editingContactKey } from "./common";

const CountryContacts = observer(class CountryContacts extends React.Component {
    constructor(props) {
        super(props);

        makeObservable(this, {
            createContact: action.bound
        });
    }

    createContact() {
        let { countryCode, localCountry, updateSearchParams, addContact } = this.props

        addContact(countryCode)
        updateSearchParams({ editingContact: localCountry?.previousContactIndex })
    }

    render() {
        let {
            createContact,
            props
        } = this;

        let {
            localCountry,
            countryCode,
            searchParams,
            updateSearchParams,
            updateContact,
            deleteContact
        } = props;

        const editingContactKeyParam = searchParams.get(editingContactKey)
        const contacts = localCountry ? Object.entries(localCountry.contacts) : [ ];
        const editingContact = localCountry?.contacts[editingContactKeyParam];

        return (
            <div>
                { contacts
                    .filter(([ contactId ]) => contactId !== editingContactKeyParam)
                    .map(([ contactId, contact ]) =>
                    <Contact key={ contactId }
                             contactId={ contactId }
                             contact={ contact }
                             countryCode = { countryCode }
                             searchParams={ searchParams }
                             updateSearchParams={ updateSearchParams }
                             updateContact={ updateContact }
                             deleteContact={ deleteContact }
                             />
                )}
                { editingContact ?
                <Contact key={ editingContactKeyParam }
                         contactId={ editingContactKeyParam }
                         contact={ editingContact }
                         countryCode = { countryCode }
                         searchParams={ searchParams }
                         updateSearchParams={ updateSearchParams }
                         updateContact={ updateContact }
                         deleteContact={ deleteContact }
                         /> :
                <Button className="dialog-button"
                        intent="success"
                        onClick={ createContact }
                        icon="plus"
                        text="Create new contact"
                        />
                }
            </div>
        );
    }
})

export default CountryContacts;