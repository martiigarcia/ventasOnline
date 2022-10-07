import {Component} from "react";
import "./App.css";
import Body from "./Body";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

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
