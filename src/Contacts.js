import { observer } from "mobx-react";
import React from "react";
import { makeObservable } from "mobx";
import { Button, Card } from "@blueprintjs/core";

const Contacts = observer( class Contacts extends React.Component {
    constructor(props) {
        super(props);

        makeObservable(this, {

        });
    }

    // onchange fields

    // onEdit make writable

    // onSave save fields
    // if fields are empty, delete self?

    render() {
        return(
            <Card interactive={ true }>
                <table className="bp5-html-table bp5-compact">
                    <thead>
                    <th>Name</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Info</td>
                    </tr>
                    </tbody>
                </table>
                <Button>Edit</Button>
                <Button>Delete</Button>
            </Card>
        );
    }
})

export default Contacts;