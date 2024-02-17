function setLocalData(country, { comment, url, contactList } = {}) {
    if (!country) {
        console.log("No country, cannot set local data");
        return null;
    }
    let prevData = getLocalData(country)
    let index = prevData.index ?? 0;

    let countryData = {
        comment: comment ?? "",
        url: url ?? "",
        contactList: contactList ?? [],
        index: index,
    }
    localStorage.setItem(country, JSON.stringify(countryData))

}



function getLocalData(key) {
    let localData = localStorage.getItem(key)
    if (!localData) return null;
    return JSON.parse(localData);
}

export { setLocalData, getLocalData }