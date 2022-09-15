import React, {Component} from "react";
import ProductSelect from "./ProductSelect";
import TarjetasList from "./TarjetasList";
import CalcularMonto from "./CalcularMonto";
import Pagar from "./Pagar";


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
                <ProductSelect doProducts={this.handleProductos}></ProductSelect>
                <TarjetasList doTarjeta={this.handleTarjeta}></TarjetasList>
                <CalcularMonto
                    productos={this.state.productos}
                    tarjeta={this.state.tarjeta}
                ></CalcularMonto>
                <Pagar
                    productos={this.state.productos}
                    tarjeta={this.state.tarjeta}
                ></Pagar>
            </div>
        );
    }
}