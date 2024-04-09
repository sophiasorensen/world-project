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
        let currData = this.getLocalData(countryKey);

        if (!currData) {
            console.error(`Tried to add a contact to a nonexistent country -> Key: ${ countryKey }`)
            return;
        }

        let contacts = currData.contacts;
        let newIndex = ++currData.previousContactIndex;
        contacts[newIndex] = { name:"", email:"", comment:"" };

        this.setLocalData(countryKey, {
            ...currData,
            contacts: contacts,
            previousContactIndex: newIndex
        });
    }

    updateContact(countryKey, contactId, contact) {
        let currData = this.getLocalData(countryKey);

        if (!currData) {
            console.error(`Tried to update a contact from a nonexistent country -> Key: ${ countryKey }`);
            return;
        }

        let contacts = { ...currData.contacts };
        contacts[contactId] = { ...contact };
        this.setLocalData(countryKey, { ...currData, contacts });
    }

    deleteContact(countryKey, contactId) {
        let currData = this.getLocalData(countryKey);

        if (!currData) {
            console.error(`Tried to delete a contact from a nonexistent country -> Key: ${ countryKey }`)
            return;
        }

        let contacts = currData.contacts;
        let newContacts = {};
        for (const [key, value] of Object.entries(contacts))
            if (key !== contactId)
                newContacts[key] = value;

        this.setLocalData(countryKey, { ...currData, contacts: newContacts });
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
            <div>
                <Page getLocalData={ getLocalData }
                      setLocalData={ setLocalData }
                      addContact={ addContact }
                      updateContact={ updateContact }
                      deleteContact={ deleteContact }
                      />
            </div>
        );
    }
})

export default LocalCrud;