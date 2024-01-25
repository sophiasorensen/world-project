import React from "react";
import { Button, InputGroup, TextArea } from "@blueprintjs/core";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import "./App.css";

const CountryUserCommentBox = observer( class CountryUserCommentBox extends React.Component {
    commentText = "";
    urlText="";
    writable = false;

    constructor(props) {
        super(props);

        makeObservable(this, {
            commentText:observable,
            urlText: observable,
            writable:observable,
            setComment:action.bound,
            setUrl:action.bound,
            toggleReadability:action.bound,
            saveChanges:action.bound,
            cancelChanges:action.bound,
            buttons:action.bound
        })
    }

    setComment(event) {
        this.commentText = event.target.value;
    }

    setUrl(event) {
        this.urlText = event.target.value;
    }

    toggleReadability() {
        this.writable = !this.writable;
    }

    saveChanges() {
        this.toggleReadability();
        localStorage.setItem("comment", this.commentText);
        localStorage.setItem("url", this.urlText);
    }

    cancelChanges() {
        this.toggleReadability();
        this.commentText = localStorage.getItem("comment");
        this.urlText = localStorage.getItem("url");
    }

    buttons() {
        if (this.writable) {
            return (
                <div>
                    <Button onClick={ this.saveChanges }>Save</Button>
                    <Button onClick={ this.cancelChanges }>Cancel</Button>
                </div>
            );
        } else {
            return (
                <Button onClick={ this.toggleReadability }>Edit</Button>
            );
        }
    }

    render() {
        return (
            <div>
                Comment
                <TextArea fill={ true } readOnly={ !this.writable } onChange={ this.setComment } value={ this.commentText } />
                <p className="info-margin">URL</p>
                <InputGroup readOnly={ !this.writable } onChange={ this.setUrl } value={ this.urlText } />
                <p className="info-margin" />
                { this.buttons() }
            </div>
        );
    }
} );

export default CountryUserCommentBox;