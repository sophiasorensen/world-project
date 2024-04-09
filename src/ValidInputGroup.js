import React from "react";
import { InputGroup } from "@blueprintjs/core";

class ValidInputGroup extends React.Component {
    render() {
        let { isError, errorMessage, value, errorBelow = false, ...restProps } = this.props;

        const errorElement = <p className="error-text">{ errorMessage }</p>;

        return (
            <div>
                { !isError && !errorBelow && errorElement }
                <InputGroup value={ value }
                            intent={ !isError ? "danger" : null }
                            { ...restProps }
                            />
                { !isError && errorBelow && errorElement }
            </div>);
    }
}

export default ValidInputGroup;