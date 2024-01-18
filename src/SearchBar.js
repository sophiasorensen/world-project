import React from "react";
import { action, makeObservable } from "mobx";
import { InputGroup } from "@blueprintjs/core";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        makeObservable(this, {
            handleSearchQuery: action.bound,
        });
    }

    handleSearchQuery(value) {
        setTimeout(() => { this.props.updateSearchParams({ searchQuery: value }) }, 1000);
        console.log(`${this.props.searchParams.get('searchQuery')}`)
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