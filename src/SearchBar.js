import React from "react";
import { action, makeObservable, observable } from "mobx";
import { InputGroup } from "@blueprintjs/core";

class SearchBar extends React.Component {
    q = "";
    constructor(props) {
        super(props);

        makeObservable(this, {
            q: observable,
            setQ: action.bound,
            handleSearchQuery: action.bound,
        });
    }

    setQ(currentQ) {
        this.q = currentQ;
    }

    handleSearchQuery(value) {
        this.setQ(value);

        setTimeout(() => {
            if (value !== this.q) return;
            this.props.updateSearchParams({ q: this.q || null })
        }, 500);

    }

    render() {
        return (
            <div>
                <InputGroup className="bp5-align-right bp5-small" type="text" fill="false" onValueChange={ this.handleSearchQuery } />
            </div>
        )
    }
}

export default SearchBar;