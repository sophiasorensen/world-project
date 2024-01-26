import React from "react";
import { Button, InputGroup, TextArea } from "@blueprintjs/core";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import "./App.css";

const CountryUserCommentBox = observer( class CountryUserCommentBox extends React.Component {
    validUrl1 = "http://";
    validUrl2 = "https://";

    commentText = localStorage.getItem("comment");
    urlText = localStorage.getItem("url");
    writable = false;
    error = false;

    constructor(props) {
        super(props);

        makeObservable(this, {
            validUrl1:observable,
            validUrl2:observable,
            commentText:observable,
            urlText: observable,
            writable:observable,
            error:observable,
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
        if (this.urlText) {
            if (this.urlText.substring(0, this.validUrl1.length) === this.validUrl1 || this.urlText.substring(0, this.validUrl2.length) === this.validUrl2) {
                this.error = false;
            } else {
                this.error = true;
            }
        }
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
                <InputGroup readOnly={ !this.writable } onChange={ this.setUrl } value={ this.urlText } intent={ this.error ? "danger" : null } />
                <p className="info-margin" />
                { this.buttons() }
            </div>
        );
    }
} );

export default CountryUserCommentBox;