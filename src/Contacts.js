import { observer } from "mobx-react";
import React from "react";
import { action, makeObservable, observable } from "mobx";
import { Button, Card, InputGroup } from "@blueprintjs/core";

const Contacts = observer( class Contacts extends React.Component {
    error = false;
    constructor(props) {
        super(props);
        this.name = this.props.name;
        this.email = this.props.email;
        this.comment = this.props.comment;
        this.editable = this.props.editable;

        makeObservable(this, {
            error:observable,
            name:observable,
            email: observable,
            comment:observable,
            editable:observable,

            updateName:action.bound,
            updateEmail:action.bound,
            saveChanges:action.bound,
        });
    }

    updateName(inputName) {
        this.name = inputName;
    }

    updateEmail(event) {
        this.email = event.target.value;

        let { email } = this;

        if (!email.includes('@')) {
            this.error = true;
        } else { this.error = false; }
    }

    saveChanges() {
        this.editable = false;
    }



    // onEdit make writable

    // onSave save fields
    // if fields are empty, delete self?


    render() {
        let {
            error,
            name,
            email,
            comment,
            editable,
            updateName,
            updateEmail,
            saveChanges
        } = this;
        console.log(error)

        return(
            <Card interactive={ true }>
                <table className="bp5-html-table bp5-compact">
                    <colgroup span="2"></colgroup>
                    <thead>
                        <tr>
                            { editable ?
                                <th colSpan="2" scope="colgroup">
                                    <InputGroup onChange={ updateName } placeholder="Name" />
                                </th> :
                                <th colSpan="2" scope="colgroup">
                                    { name }
                                </th>}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            { error && <p className={ "error-text" }>
                                Email addresses must include @
                            </p> }
                            Email: { editable ?
                            <td>
                                <InputGroup
                                    onChange={ updateEmail }
                                    placeholder="Enter a valid email address"
                                    value={ email }
                                    intent={error ? "danger" : null} />
                            </td> :
                            <td>
                                <div>{ email }</div>
                            </td> }
                        </tr>
                        <tr>
                            Comment: { editable ?
                            <td>
                                <InputGroup onChange={ updateName } placeholder="Comment"></InputGroup>
                            </td> :
                            <td>
                                { comment }
                            </td> }
                        </tr>
                    </tbody>
                </table>
                <div align={"right"}>
                    { editable ?
                        <div align="right">
                            <Button className="card-button">Cancel</Button>
                            <Button className="card-button" intent="primary" onClick={ saveChanges }>Save</Button>
                        </div>
                         :
                        <div align="right">
                            <Button className="card-button">Edit</Button>
                            <Button className="card-button" intent="error">Delete</Button>
                        </div>
                    }

                </div>
            </Card>
        );
    }
})

export default Contacts;