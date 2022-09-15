import React, { Component } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import { Divider, Input } from "@mui/material";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            searchTxt: "",
        };
    }

    handleSearch() {
        this.props.doSearch(this.state.searchTxt);
    }

    handleClick(e, itemClicked) {
        this.props.handler(itemClicked);
    }

    render() {
        return (
            <div>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <AppBar position="static" color="secondary">
                        <Container maxWidth="xl">
                            <Toolbar>
                                <Tab
                                    label="Productos"
                                    href="#"
                                    onClick={(e) => this.handleClick(e, 0)}
                                >
                                    Productos
                                </Tab>
                                <Tab
                                    label="Promociones"
                                    href="#"
                                    onClick={(e) => this.handleClick(e, 1)}
                                >
                                    Promociones
                                </Tab>
                                <Tab
                                    label="Tarjeta"
                                    href="#"
                                    onClick={(e) => this.handleClick(e, 2)}
                                >
                                    Tarjeta
                                </Tab>
                                <Tab
                                    label="Comprar"
                                    href="#"
                                    onClick={(e) => this.handleClick(e, 3)}
                                >
                                    Comprar
                                </Tab>

                                <Paper
                                    component="form"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: 400,
                                    }}
                                >
                                    <InputBase
                                        sx={{ color: "secondary.light", pl: "10px" }}
                                        placeholder="Buscar"
                                        inputProps={{ "aria-label": "buscar" }}
                                        type="text"
                                        name="apellido"
                                        onChange={(e) =>
                                            this.setState({
                                                searchTxt: e.target.value,
                                            })
                                        }
                                    />
                                    <Divider sx={{ m: 0.5 }} orientation="vertical" />

                                    <IconButton
                                        sx={{ color: "secondary.light", p: "10px" }}
                                        variant="outline-success"
                                        onClick={this.handleSearch}
                                    >
                                        <SearchIcon
                                            sx={{
                                                color: "secondary.light",
                                                height: "30px",
                                            }}
                                        />{" "}
                                        Buscar
                                    </IconButton>
                                </Paper>
                            </Toolbar>
                        </Container>
                    </AppBar>
                </Box>
            </div>
        );
    }
}