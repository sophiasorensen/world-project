import React from "react";
import { observer } from "mobx-react";
import { makeObservable } from "mobx";

const CountryContacts = observer( class CountryContacts extends React.Component {

    constructor(props) {
        super(props);

        makeObservable(this, {

        });
    }

    render() {
        return (
            <p>contacts render</p>
        );
    }
})

export default CountryContacts;