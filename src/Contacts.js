import { observer } from "mobx-react";
import React from "react";
import { action, makeObservable, observable } from "mobx";
import { Button, Card, InputGroup } from "@blueprintjs/core";
import { countryKey } from "./common";

const Contacts = observer( class Contacts extends React.Component {
    error = false;
    prevName = "";
    prevEmail = "";
    prevComment = "";

    constructor(props) {
        super(props);
        this.countryCode = this.props.searchParams.get(countryKey);
        this.localData = this.props.localData;
        this.name = this.localData.name;
        this.email = this.localData.email;
        this.comment = this.localData.comment;
        this.editable = this.localData.editable;

        // this.name = this.props.name;
        // this.email = this.props.email;
        // this.comment = this.props.comment;
        // this.editable = this.props.editable;

        makeObservable(this, {
            localData:observable,
            countryCode:observable,
            error:observable,
            // prevName:observable,
            // prevEmail:observable,
            // prevComment:observable,
            name:observable,
            email: observable,
            comment:observable,
            editable:observable,

            makeEditable:action.bound,
            updateName:action.bound,
            updateEmail:action.bound,
            updateComment:action.bound,
            saveChanges:action.bound,
            cancelChanges:action.bound,
        });
    }

    makeEditable() {
        this.editable = true;
    }

    updateName(event) {
        this.name = event.target.value;
    }

    updateEmail(event) {
        this.email = event.target.value;

        let { email } = this;

        if (!email.includes('@')) {
            this.error = true;
        } else { this.error = false; }
    }

    updateComment(event) {
        this.comment = event.target.value;
    }

    saveChanges() {
        this.editable = false;
        this.localData.name = this.name;
        this.localData.email = this.email;
        this.localData.comment = this.comment;
        localStorage.setItem(this.countryCode, JSON.stringify({ localData: this.localData }));
    }

    cancelChanges() {
        let {
            prevName,
            prevEmail,
            prevComment
        } = this;
        this.editable = false;
        this.name = this.localData.name;
        this.email = this.localData.email;
        this.comment = this.localData.comment;

        // this.name = prevName;
        // this.email = prevEmail;
        // this.comment = prevComment;
    }

    render() {
        let {
            error,
            name,
            email,
            comment,
            editable,
            makeEditable,
            updateName,
            updateEmail,
            updateComment,
            saveChanges,
            cancelChanges
        } = this;

        console.log(error)

        return(
            <Card interactive={ true }>
                <div>
                    { editable ?
                        <InputGroup onChange={ updateName } value={ name } placeholder="Name" />
                        :
                        <p>{ name }</p>
                    }
                </div>
                { error &&
                    <p className={ "error-text" }>
                        Email addresses must include @
                    </p>
                }

                <div>Email: { editable ?
                    <InputGroup
                        onChange={ updateEmail }
                        placeholder="Enter a valid email address"
                        value={ email }
                        intent={error ? "danger" : null} />
                    :
                    <p>{ email }</p>
                }</div>

                <div>Comment: { editable ?
                    <InputGroup onChange={ updateComment } placeholder="Comment" value={ comment }></InputGroup>
                    :
                    <p>{ comment }</p>
                }</div>

                <div align={"right"}>
                    { editable ?
                        <div align="right">
                            <Button className="card-button" onClick={ cancelChanges }>Cancel</Button>
                            <Button className="card-button" intent="primary" onClick={ saveChanges } disabled={ error }>Save</Button>
                        </div>
                         :
                        <div align="right">
                            <Button className="card-button" onClick={ makeEditable }>Edit</Button>
                            <Button className="card-button" intent="error">Delete</Button>
                        </div>
                    }
                </div>
            </Card>
        );
    }
})

export default Contacts;