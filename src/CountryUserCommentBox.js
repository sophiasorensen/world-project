import React from "react";
import { Button, TextArea } from "@blueprintjs/core";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
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
            buttons:action.bound
        })
    }

    setComment(value) {
        this.commentText = value;
    }

    toggleReadability() {
        this.writable = !this.writable;
    }

    buttons() {
        console.log(`${this.writable}`);
        if (this.writable) {
            return (
                <div>
                    <Button onClick={ this.toggleReadability }>Save</Button>
                    <Button onClick={ this.toggleReadability }>Cancel</Button>
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
                <TextArea readOnly={ !this.writable } onChange={ this.setComment }/>
                { this.buttons() }
            </div>
        );
    }
} );

export default CountryUserCommentBox;