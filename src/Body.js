import React, {Component} from "react";
import ProductSelect from "./ProductSelect";
import TarjetasList from "./TarjetasList";
import CalcularMonto from "./CalcularMonto";
import Pagar from "./Pagar";
import ListaVentas from "./VentasList";
import {Chip, Divider, Grid, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import ProductForm from "./UpdateProductForm";
import {ProductService} from "./servicios/ProductService";


export default class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: [],
            tarjeta: "",
        }

        this.handleProductos = this.handleProductos.bind(this);
        this.handleTarjeta = this.handleTarjeta.bind(this);
    }

    handleProductos(productosElegidos) {
        this.setState({
            productos: productosElegidos,
        });
    }

    handleTarjeta(tarjeta) {
        this.setState({
            tarjeta: tarjeta,
        })
    }


    render() {
        return (
            <div fluid className="body">
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>

                        <Grid item xs={4} marginTop={15} sx={{borderRight: {sm: '2px solid #ddd'}}}>
                            <Divider>
                                <Divider variant="middle" sx={{marginBottom:3}}>
                                    <Chip label="Hacer una compra" color={"secondary"} variant={"outlined"}/>
                                </Divider>

                                <ProductSelect doProducts={this.handleProductos}></ProductSelect>
                                <br/>
                                <TarjetasList doTarjeta={this.handleTarjeta}></TarjetasList>
                                <CalcularMonto
                                    productos={this.state.productos}
                                    tarjeta={this.state.tarjeta}
                                ></CalcularMonto>
                                <Pagar
                                    productos={this.state.productos}
                                    tarjeta={this.state.tarjeta}
                                ></Pagar>
                            </Divider>


                        </Grid>

                        <Grid item xs={8} marginTop={15}>
                            <Divider>
                                <ListaVentas></ListaVentas>
                            </Divider>
                        </Grid>

                        <Grid item xs={4} marginBottom={10} sx={{borderRight: {sm: '2px solid #ddd'}}}>
                            <Divider>
                                <Divider variant="middle" sx={{marginBottom:3}}>
                                    <Chip label="Modificar Producto" color={"primary"} variant={"outlined"}/>
                                </Divider>
                                <ProductForm></ProductForm>
                            </Divider>
                        </Grid>

                    </Grid>
                </Box>


            </div>
        );
    }
}