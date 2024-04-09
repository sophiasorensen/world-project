import React from "react";
import { Button, H6, InputGroup, TextArea } from "@blueprintjs/core";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import "./App.css";

const validUrl1 = "http://";
const validUrl2 = "https://";

const CountryUserCommentBox = observer( class CountryUserCommentBox extends React.Component {
    writable = false;
    error = false;

    constructor(props) {
        super(props);
        this.countryData = this.props.localData[this.props.countryCode]
        this.commentText = this.countryData.comment;
        this.urlText = this.countryData.url;

        makeObservable(this, {
            commentText:observable,
            urlText:observable,
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
        let { urlText } = this;

        this.urlText = event.target.value;
        if (urlText) {
            if (urlText.substring(0, validUrl1.length) === validUrl1 || urlText.substring(0, validUrl2.length) === validUrl2) {
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
        let {
            localData,
            countryCode,
            setLocalData
        } = this.props;

        let {
            commentText,
            urlText
        } = this;

        this.toggleReadability();

        setLocalData(countryCode, { ...localData[countryCode], comment: commentText, url: urlText })
    }

    cancelChanges() {
        let {
            localData,
            countryCode
        } = this.props;

        this.toggleReadability();
        this.error = false;

        this.commentText = localData[countryCode].comment;
        this.urlText = localData[countryCode].url;
    }

    render() {
        let {
            localData,
            countryCode
        } = this.props;

        let {
            commentText,
            urlText,
            writable,
            error
        } = this;

        return (
            <div className="info-margin">
                <H6 className="info-margin">Comment</H6>
                <TextArea
                    fill={ true }
                    readOnly={ !writable }
                    onChange={ this.setComment }
                    value={ writable ? commentText : localData[countryCode].comment } />
                <H6 className="info-margin">URL</H6>
                { error && <p className={ "error-text" }>
                    URLs must begin with "{validUrl1}" or "{validUrl2}"
                </p>
                }
                <InputGroup
                    readOnly={ !writable }
                    onChange={ this.setUrl }
                    value={ writable ? urlText : localData[countryCode].url }
                    intent={ error ? "danger" : null } />
                <div className={ "info-margin" } />
                { writable ?
                    <div>
                        <Button className="button-margin" intent="primary" disabled={ error } onClick={ this.saveChanges }>Save</Button>
                        <Button className="button-margin" onClick={ this.cancelChanges }>Cancel</Button>
                    </div> : <Button onClick={ this.toggleReadability }>Edit</Button>
                }
            </div>
        );
    }
} );

export default CountryUserCommentBox;