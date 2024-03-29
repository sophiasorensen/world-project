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
        let { q } = this;

        setTimeout(() => {
            if (value !== q) return;
            this.props.updateSearchParams({ q: q || null })
        }, 500);

    }

    render() {
        return (
            <InputGroup className="bp5-align-right bp5-small" type="text" fill="false" onValueChange={ this.handleSearchQuery } />
        )
    }
}

export default SearchBar;