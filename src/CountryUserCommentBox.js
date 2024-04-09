import React from "react";
import { Button, H6, InputGroup, TextArea } from "@blueprintjs/core";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import "./App.css";

const validUrl1 = "http://";
const validUrl2 = "https://";

const CountryUserCommentBox = observer(class CountryUserCommentBox extends React.Component {
    writable = false;
    error = false;

    constructor(props) {
        super(props);

        this.commentText = props.localCountry?.comment ?? "";
        this.urlText = props.localCountry?.url ?? "";

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

        if (urlText)
            this.error = !(urlText.substring(0, validUrl1.length) === validUrl1 || urlText.substring(0, validUrl2.length) === validUrl2);
    }

    toggleReadability() {
        this.writable = !this.writable;
    }

    saveChanges() {
        let {
            commentText,
            urlText,
            props,
            toggleReadability
        } = this;

        let {
            countryCode,
            localCountry,
            setLocalData
        } = props;

        toggleReadability();

        setLocalData(countryCode, { ...localCountry, comment: commentText, url: urlText })
    }

    cancelChanges() {
        let {
            localCountry
        } = this.props;

        this.toggleReadability();
        this.error = false;

        this.commentText = localCountry?.comment ?? "";
        this.urlText = localCountry?.url ?? "";
    }

    render() {
        let {
            writable, error, commentText,
            urlText, props, saveChanges,
            cancelChanges, toggleReadability, setUrl, setComment } = this;

        return (
            <React.Fragment>
                <H6>Comment</H6>
                <TextArea className="info-margin"
                          readOnly={ !writable }
                          fill={ true }
                          onChange={ setComment }
                          value={ commentText }
                          />
                <H6>URL</H6>
                { error &&
                <p className={ "error-text" }>
                    URLs must begin with "{ validUrl1 }" or "{ validUrl2 }"
                </p>
                }
                <InputGroup className="info-margin"
                            readOnly={ !writable }
                            onChange={ setUrl }
                            value={ urlText }
                            intent={ error ? "danger" : null }
                            />
                { writable ?
                <div>
                    <Button className="button-margin" intent="primary" disabled={ error } onClick={ saveChanges }>Save</Button>
                    <Button className="button-margin" onClick={ cancelChanges }>Cancel</Button>
                </div> :
                <Button onClick={ toggleReadability }>Edit</Button>
                }
            </React.Fragment>
        );
    }
});

export default CountryUserCommentBox;