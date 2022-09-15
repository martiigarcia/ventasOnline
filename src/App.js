import React, {Component} from "react";
import "./App.css";
import Body from "./Body";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemMenu: 0,
            searchTxt: "",
        };
        this.handleItemMenuClicked = this.handleItemMenuClicked.bind(this);
        this.handleDoSearch = this.handleDoSearch.bind(this);
    }

    handleDoSearch(inputValue) {
        this.setState({
            searchTxt: inputValue,
        });
    }

    handleItemMenuClicked(itemClickeado) {
        this.setState({
            itemMenu: itemClickeado,
            searchTxt: "",
        });
    }

    render() {
        return (
            <>
                <Body
                    inputValue={this.state.searchTxt}
                    itemClicked={
                        this.state.itemMenu}
                />
            </>
        );
    }
}