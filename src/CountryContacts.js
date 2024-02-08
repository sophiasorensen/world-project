import React from "react";
import { observer } from "mobx-react";
import { Button, DialogBody } from "@blueprintjs/core";
import { action, makeObservable } from "mobx";
import { countryKey } from "./common";
import Contacts from "./Contacts";

const CountryContacts = observer( class CountryContacts extends React.Component {

    constructor(props) {
        super(props);
        this.countryCode = this.props.searchParams.get(countryKey);
        this.localData = this.resolveLocalData(this.props.searchParams.get(countryKey))
        this.contactList = this.localData.contactList;

        makeObservable(this, {
            createContact:action.bound,
        });
    }

    resolveLocalData(key) {
        let localData = localStorage.getItem(key)
        if (!localData) return( { contactList: [] } )
        console.log(localData)
        return JSON.parse(localData)
    }

    createContact() {
        // add contact to list
        let { localData, contactList, countryCode } = this;
        contactList.push({ name:"", email:"", comment:"", editable:true })
        console.log(contactList)
        localData.contactList = contactList;
        localStorage.setItem(countryCode, JSON.stringify(localData))
    }

    render() {
        let {
            contactList,
            createContact
        } = this;

        return (
            <DialogBody>
                { contactList.map( p => <Contacts name={ p.name } email={ p.email } comment={ p.comment } editable={ false } />)}
                <Button intent="success" onClick={ createContact }>+Create new contact</Button>
            </DialogBody>
        );
    }
})

export default CountryContacts;