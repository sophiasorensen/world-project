import React from "react";

function setLocalData(country, { comment, url, contacts, previousContactIndex } = {}) {
    if (!country) {
        console.log("No country, cannot set local data");
        return null;
    }

    let countryData = {
        comment: comment ?? "",
        url: url ?? "",
        contacts: contacts ?? {},
        previousContactIndex: previousContactIndex ?? 0,
    }
    localStorage.setItem(country, JSON.stringify(countryData))
}

function addContact(countryKey) {
    let currData = getLocalData(countryKey);
    let contacts = currData.contacts;
    let newIndex = ++currData.previousContactIndex
    contacts[newIndex] = { name:"", email:"", comment:"" }
    setLocalData(countryKey, {
        ...currData,
        contacts: contacts,
        previousContactIndex: newIndex
    })
}

function updateContact(countryKey, index, contact) {
    let currData = getLocalData(countryKey);
    let contacts = { ...currData.contacts };
    let name = contact.name
    let email = contact.email
    let comment = contact.comment
    contacts[index] = { name, email, comment };

    setLocalData(countryKey, { ...currData, contacts: contacts })
}

function deleteContact(countryKey, index) {
    let currData = getLocalData(countryKey);
    let contacts = currData.contacts;
    let newContacts = {}
    for (const [key, value] of Object.entries(contacts)) {
        if (key !== index) {
            newContacts[key] = value
        }
    }
    setLocalData(countryKey, { ...currData, contacts: newContacts })
}

function getLocalData(countryKey) {
    let localData = localStorage.getItem(countryKey)
    if (!localData) {
        setLocalData(countryKey);
        localData = localStorage.getItem(countryKey);
    }
    return JSON.parse(localData);
}

export { setLocalData, addContact, updateContact, deleteContact, getLocalData }