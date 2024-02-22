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
        let { localData } = this;
        if (!localData) {
            setLocalData(this.countryCode);
        }
        this.props.updateSearchParams({ editingContact: localData.index + 1 })

        return <Contacts
            key={ localData.index + 1 }

            searchParams={ this.props.searchParams } // make editable=id? and push to searchParams
            updateSearchParams={this.props.updateSearchParams}
        />
    }

    render() {
        let {
            localData,
            contactList,
            createContact
        } = this;

        return (
            <DialogBody>
                <div>{ contactList.map( (currentContact) =>
                    <Contacts
                        key={ localData.index }
                        currentContact={ currentContact }
                        searchParams={ this.props.searchParams }
                        updateSearchParams={ this.props.updateSearchParams }
                    />)}
                </div>
                { this.props.searchParams.editingContact ??
                    <Contacts
                        key={ localData.index + 1 }
                        searchParams={ this.props.searchParams }
                        updateSearchParams={this.props.updateSearchParams}
                    />
                }
                <Button className="dialog-button" intent="success" onClick={ createContact }>+Create new contact</Button>
            </DialogBody>
        );
    }
})

export default CountryContacts;