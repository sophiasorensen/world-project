import React from "react";
import { Button, InputGroup, TextArea } from "@blueprintjs/core";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import "./App.css";

const CountryUserCommentBox = observer( class CountryUserCommentBox extends React.Component {
    validUrl1 = "http://";
    validUrl2 = "https://";
    comment = "comment";
    url = "url";

    initJson = JSON.parse(localStorage.getItem(this.props.searchParams.get("country")))
    commentText = this.initJson ? this.initJson.comment : "";
    urlText = this.initJson ? this.initJson.url : "";
    writable = false;
    error = false;

    constructor(props) {
        super(props);

        makeObservable(this, {
            commentText:observable,
            urlText: observable,
            writable:observable,
            error:observable,

            setComment:action.bound,
            setUrl:action.bound,
            toggleReadability:action.bound,
            saveChanges:action.bound,
            cancelChanges:action.bound,
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
        let countryCode = this.props.searchParams.get("country");
        this.toggleReadability();
        localStorage.setItem(countryCode, JSON.stringify({ comment: this.commentText, url: this.urlText }));
    }

    cancelChanges() {
        this.toggleReadability();
        let parsed = JSON.parse(localStorage.getItem(this.props.searchParams.get("country")));
        console.log(`parsed JSON: ${parsed.comment} ${parsed.url}`)
        this.commentText = parsed.comment;
        this.urlText = parsed.url;
        this.error = false;
    }

    buttons() {
        if (this.writable) {
            return (
                <div>
                    <Button className={ "button-margin" } intent={ "primary" } disabled={ this.error } onClick={ this.saveChanges }>Save</Button>
                    <Button className={ "button-margin" } onClick={ this.cancelChanges }>Cancel</Button>
                </div>
            );
        } else {
            return (
                <Button onClick={ this.toggleReadability }>Edit</Button>
            );
        }
    }

    displayErrorMessage() {
        if (this.error) {
            return (
                <p className={ "error-text" }>URLs must begin with "http://" or "https://"</p>
            );
        }
    }

    render() {
        return (
            <div>
                <p className="info-margin">Comment</p>
                <TextArea fill={ true } readOnly={ !this.writable } onChange={ this.setComment } value={ this.commentText } />
                <p className="info-margin">URL</p>
                { this.displayErrorMessage() }
                <InputGroup readOnly={ !this.writable } onChange={ this.setUrl } value={ this.urlText } intent={ this.error ? "danger" : null } />
                <p className={ "info-margin" } />
                { this.buttons() }
            </div>
        );
    }
} );

export default CountryUserCommentBox;