function setLocalData(country, { comment, url, contactList, index } = {}) {
    if (!country) {
        console.log("No country, cannot set local data");
        return null;
    }

    let countryData = {
        comment: comment ?? "",
        url: url ?? "",
        contactList: contactList ?? [],
        index: index ?? 0,
    }
    localStorage.setItem(country, JSON.stringify(countryData))

}

function addContact(country, { name, email, comment, index} = {}) {
    let currData = getLocalData(country);
    console.log("before adding contact: ")
    console.log(currData)
    let contactList = currData.contactList;
    if (index > currData.index) {
        console.log("Adding contact " + name)
        contactList.push({ name: name, email: email, comment: comment, index: index })
    } else {
        console.log("Updating contact at index " + index)
        contactList = contactList.map( contact => {
            if (contact.index === index) {
                return { name: name, email: email, comment: comment, index: index }
            }
        })
    }
    setLocalData(country, {
        comment: currData.comment,
        url: currData.url,
        contactList: contactList,
        index: index + 1
    })
    console.log(getLocalData(country))
}

function deleteContact(country, index) {
    let currData = getLocalData(country);
    let contactList = currData.contactList;
    if (index < currData.index) {
        contactList.splice(index, 1)
    }
    setLocalData(country, { ...currData, contactList: contactList, index: currData.index - 1 })
}

function getLocalData(key) {
    let localData = localStorage.getItem(key)
    if (!localData) {
        setLocalData(key);
        localData = localStorage.getItem(key);
    }
    console.log(localData)
    return JSON.parse(localData);
}

export { setLocalData, addContact, deleteContact, getLocalData }