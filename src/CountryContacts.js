import React from "react";
import { observer } from "mobx-react";
import { Button, DialogBody } from "@blueprintjs/core";
import { makeObservable } from "mobx";

const CountryContacts = observer( class CountryContacts extends React.Component {
    constructor(props) {
        super(props);

        makeObservable(this, {});
    }

    render() {
        return (
            <DialogBody>
                <Button intent="success">+Create new contact</Button>
            </DialogBody>
        );
    }
})

export default CountryContacts;