import React from "react";
import { observer } from "mobx-react";
import { Button, DialogBody } from "@blueprintjs/core";
import { action, makeObservable, observable } from "mobx";
import { countryKey } from "./common";
import Contacts from "./Contacts";
import { getLocalData, setLocalData } from "./localCrud";

const CountryContacts = observer( class CountryContacts extends React.Component {

    constructor(props) {
        super(props);
        this.countryCode = this.props.searchParams.get(countryKey);
        this.localData = getLocalData(this.countryCode);
        this.contactList = this.localData?.contactList ?? [];

        makeObservable(this, {
            localData: observable,
            contactList: observable,

            createContact:action.bound,
        });
    }

    createContact() {
        let { localData, contactList, countryCode } = this;

        contactList.push({ name:"", email:"", comment:"", editable:true })
        localData.contactList = contactList;
        setLocalData(countryCode, localData);
    }

    render() {
        let {
            localData,
            contactList,
            createContact
        } = this;

        return (
            <DialogBody>
                <div>{ contactList.map( (currentContact) => <Contacts key={ localData.index } currentContact={ currentContact } searchParams={ this.props.searchParams } />)}</div>
                <Button className="dialog-button" intent="success" onClick={ createContact }>+Create new contact</Button>
            </DialogBody>
        );
    }
})

export default CountryContacts;