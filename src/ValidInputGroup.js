import { observer } from "mobx-react";
import React from "react";
import { makeObservable } from "mobx";
import { InputGroup } from "@blueprintjs/core";

const ValidInputGroup = observer( class CountryContacts extends React.Component {
    constructor(props) {
        super(props);

        makeObservable(this, {

        });
    }

    render() {
        let { errorPredicate, errorMessage, value, ...restProps } = this.props;
        return(
            <div>
                { !errorPredicate(value) && <p className={ "error-text"}>{errorMessage}</p> }
                <InputGroup
                    value={ value }
                    intent={ !errorPredicate(value) ? "danger" : null }
                    { ...restProps }
                />
            </div>);
    }
})
export default ValidInputGroup;