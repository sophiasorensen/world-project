import React from "react";
import { observer } from "mobx-react";
import { action, makeObservable, observable } from "mobx";
import Page from "./Page";

const localKey = "world-project"

const LocalCrud = observer(class LocalCrud extends React.Component {
    currData = observable.map({ }, { deep: false });

    constructor(props) {
        super(props);

        makeObservable(this, {
            getOrInitLocalData: action.bound,
            setLocalData: action.bound,
            addContact: action.bound,
            updateContact: action.bound,
            deleteContact: action.bound,
        });

        const initLocalData = JSON.parse(localStorage.getItem(localKey));

        if (initLocalData)
            this.currData.replace(initLocalData);
    }

    setLocalData(countryKey, { comment, url, contacts, previousContactIndex } = { }) {
        if (!countryKey) {
            console.error("No country key provided, cannot set local data");
            return null;
        }

        this.currData.set(countryKey, {
            comment: comment ?? "",
            url: url ?? "",
            contacts: contacts ?? { },
            previousContactIndex: previousContactIndex ?? 0,
        });

        let newLocalData = { };
        this.currData.forEach((value, key) => newLocalData[key] = value);
        newLocalData[countryKey] = this.currData.get(countryKey);

        localStorage.setItem(localKey, JSON.stringify(newLocalData));
    }

    addContact(countryKey) {
        let localCountry = this.getOrInitLocalData(countryKey)

        let contacts = localCountry.contacts;
        let newIndex = ++localCountry.previousContactIndex;
        contacts[newIndex] = { name:"", email:"", comment:"" };

        this.setLocalData(countryKey, {
            ...localCountry,
            contacts: contacts,
            previousContactIndex: newIndex
        });
    }

    updateContact(countryKey, contactId, contact) {
        let localCountry = this.getOrInitLocalData(countryKey);

        if (!localCountry) {
            console.error(`Tried to update a contact from a nonexistent country -> Key: ${ countryKey }`);
            return;
        }

        let contacts = { ...localCountry.contacts };
        contacts[contactId] = { ...contact };
        this.setLocalData(countryKey, { ...localCountry, contacts });
    }

    deleteContact(countryKey, contactId) {
        let localCountry = this.getOrInitLocalData(countryKey);

        if (!localCountry) {
            console.error(`Tried to delete a contact from a nonexistent country -> Key: ${ countryKey }`)
            return;
        }

        let contacts = localCountry.contacts;
        let newContacts = {};
        for (const [key, value] of Object.entries(contacts))
            if (key !== contactId)
                newContacts[key] = value;

        this.setLocalData(countryKey, { ...localCountry, contacts: newContacts });
    }

    getOrInitLocalData(countryKey) {
        let currData = this.getLocalData(countryKey);

        if (!currData) {
            this.setLocalData(countryKey);
            currData = this.getLocalData(countryKey);
        }

        return currData
    }

    getLocalData = (countryKey) => {
        return this.currData.get(countryKey);
    }

    render() {
        let {
            getLocalData,
            setLocalData,
            addContact,
            updateContact,
            deleteContact
        } = this;

        return (
            <Page getLocalData={ getLocalData }
                  setLocalData={ setLocalData }
                  addContact={ addContact }
                  updateContact={ updateContact }
                  deleteContact={ deleteContact }
                  />
        );
    }
})

export default LocalCrud;