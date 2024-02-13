import React from "react";
import { observer } from "mobx-react";
import { Button, DialogBody } from "@blueprintjs/core";
import { action, makeObservable, observable } from "mobx";
import { countryKey } from "./common";
import Contacts from "./Contacts";

const CountryContacts = observer( class CountryContacts extends React.Component {

    constructor(props) {
        super(props);
        this.countryCode = this.props.searchParams.get(countryKey);
        this.localData = this.resolveLocalData(this.props.searchParams.get(countryKey))
        this.contactList = this.localData.contactList;

        makeObservable(this, {
            contactList: observable,
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
                { contactList.map( p => <Contacts key={p} localData={p} name={ p.name } email={ p.email } comment={ p.comment } editable={ p.editable } searchParams={ this.props.searchParams } />)}
                <Button className="dialog-button" intent="success" onClick={ createContact }>+Create new contact</Button>
            </DialogBody>
        );
    }
})

export default CountryContacts;