import React from "react";
import { observer } from "mobx-react";
import { action, computed, makeObservable, observable } from "mobx";
import Page from "./Page";

const LocalCrud = observer( class Contacts extends React.Component {
    currData = observable.map({}, { deep:false })
    constructor(props) {
        super(props);

        makeObservable(this, {
            setLocalData: action.bound,
            addContact: action.bound,
            updateContact: action.bound,
            deleteContact: action.bound,
            getLocalData: action.bound,
        })
    }
    setLocalData(countryKey, { comment, url, contacts, previousContactIndex } = {}) {
        if (!countryKey) {
            console.log("No country, cannot set local data");
            return null;
        }

        this.currData[countryKey] = {
            comment: comment ?? "",
            url: url ?? "",
            contacts: contacts ?? {},
            previousContactIndex: previousContactIndex ?? 0,
        }

        localStorage.setItem(countryKey, JSON.stringify(this.currData[countryKey]))
    }

    addContact(countryKey) {
        let currData = this.getLocalData(countryKey);
        let contacts = currData.contacts;
        let newIndex = ++currData.previousContactIndex
        contacts[newIndex] = { name:"", email:"", comment:"" }
        this.setLocalData(countryKey, {
            ...currData,
            contacts: contacts,
            previousContactIndex: newIndex
        })
    }

     updateContact(countryKey, index, contact) {
        let currData = this.getLocalData(countryKey);
        let contacts = { ...currData.contacts };
        let name = contact.name
        let email = contact.email
        let comment = contact.comment
        contacts[index] = { name, email, comment };

        this.setLocalData(countryKey, { ...currData, contacts: contacts })
    }

     deleteContact(countryKey, index) {
        let currData = this.getLocalData(countryKey);
        let contacts = currData.contacts;
        let newContacts = {}
        for (const [key, value] of Object.entries(contacts)) {
            if (key !== index) {
                newContacts[key] = value
            }
        }
        this.setLocalData(countryKey, { ...currData, contacts: newContacts })
    }

     getLocalData(countryKey) {
        let countryData = this.currData[countryKey]
        if (!countryData) {
            this.setLocalData(countryKey);
            countryData = JSON.parse(localStorage.getItem(countryKey));
        }
        return countryData;
    }

    render() {
        let { currData,
            getLocalData,
            setLocalData,
            addContact,
            updateContact,
            deleteContact
        } = this;

        return (
            <Page localData={ currData }
                  getLocalData={ getLocalData }
                  setLocalData={ setLocalData }
                  addContact={ addContact }
                  updateContact={ updateContact }
                  deleteContact={ deleteContact }
            />
        );
    }
})

export default LocalCrud;