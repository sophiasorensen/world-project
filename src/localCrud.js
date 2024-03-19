function setLocalData(country, { comment, url, contacts, index } = {}) {
    if (!country) {
        console.log("No country, cannot set local data");
        return null;
    }

    let countryData = {
        comment: comment ?? "",
        url: url ?? "",
        contacts: contacts ?? {},
        index: index ?? 0,
    }
    localStorage.setItem(country, JSON.stringify(countryData))

}

function addOrUpdateContact(countryKey, id, contact) {
    let currData = getLocalData(countryKey);
    let contacts = currData.contacts;
    let name = contact.name
    let email = contact.email
    let comment = contact.comment
    contacts[id] = { name, email, comment };

    setLocalData(countryKey, {
        comment: currData.comment,
        url: currData.url,
        contacts: contacts,
        index: id > currData.index ? id : currData.index
    })
}

function deleteContact(countryKey, id) {
    let currData = getLocalData(countryKey);
    let contacts = currData.contacts;
    delete contacts.id
    setLocalData(countryKey, { ...currData, contacts: contacts })
}

function getLocalData(countryKey) {
    let localData = localStorage.getItem(countryKey)
    if (!localData) {
        setLocalData(countryKey);
        localData = localStorage.getItem(countryKey);
    }
    return JSON.parse(localData);
}

export { setLocalData, addOrUpdateContact, deleteContact, getLocalData }