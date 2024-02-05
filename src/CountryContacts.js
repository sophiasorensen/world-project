import React from "react";
import { observer } from "mobx-react";
import { Button, Card, DialogBody } from "@blueprintjs/core";
import { action, makeObservable } from "mobx";
import { countryKey } from "./common";

// dict: { countryID: { contact1, contact2, ... contactN } }
const CountryContacts = observer( class CountryContacts extends React.Component {
    constructor(props) {
        super(props);

        makeObservable(this, {
            renderEachContact:action.bound,
        });
    }

    renderEachContact() {
        let countryCode = this.props.searchParams.get(countryKey);
        return (
            <Card interactive={ true }>
                <table className="bp5-html-table bp5-compact">
                    <thead>
                    <th>Name</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Info</td>
                    </tr>
                    </tbody>
                </table>
                <Button>Edit</Button>
                <Button>Delete</Button>
            </Card>
        );
    }

    render() {
        return (
            <DialogBody>
                { this.renderEachContact() }
                <Button intent="success">+Create new contact</Button>
            </DialogBody>
        );
    }
})

export default CountryContacts;