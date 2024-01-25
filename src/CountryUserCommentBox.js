import React from "react";
import { Button, InputGroup, TextArea } from "@blueprintjs/core";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import "./App.css";

const CountryUserCommentBox = observer( class CountryUserCommentBox extends React.Component {
    commentText = "";
    writable = false;

    constructor(props) {
        super(props);

        makeObservable(this, {
            commentText:observable,
            writable:observable,
            setComment:action.bound,
            toggleReadability:action.bound,
            saveNewComment:action.bound,
            cancelNewComment:action.bound,
            buttons:action.bound
        })
    }

    setComment(event) {
        this.commentText = event.target.value;
    }

    toggleReadability() {
        this.writable = !this.writable;
    }

    saveNewComment() {
        this.toggleReadability();
        localStorage.setItem("comment", this.commentText);

    }

    cancelNewComment() {
        this.toggleReadability();
        this.commentText = localStorage.getItem("comment");
    }

    buttons() {
        if (this.writable) {
            return (
                <div>
                    <Button onClick={ this.saveNewComment }>Save</Button>
                    <Button onClick={ this.cancelNewComment }>Cancel</Button>
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
                { this.buttons() }

                <p className="info-margin">URL</p>
                <InputGroup/>
            </div>
        );
    }
} );

export default CountryUserCommentBox;