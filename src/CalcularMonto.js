import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {DialogContent} from "@mui/material";


export default function CalcularMonto({productos, tarjeta}) {
    const [open, setOpen] = React.useState(false);
    const [resultado, setResultado] = useState({resultado: ""});
    const [mensaje, setMensaje] = useState({mensaje: ""});
    const [monto, setMonto] = useState({monto: ""});

    useEffect(() => {
    }, [productos, tarjeta]);

    const calcularMontoFuncion = () => {

        const params = {
            productosX: productos,
            tarjetaX: tarjeta,
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };
        fetch("http://localhost:1234/calcularmonto?productos=" + params.productosX + "&tarjeta=" + params.tarjetaX, options)
            .then(response => response.json())
            .then((json) => {
                if (json.result === "error") {
                    setResultado({resultado: json.result});
                    setMensaje({mensaje: json.message});
                } else {
                    setResultado({resultado: json.result});
                    setMensaje({mensaje: json.message});
                    setMonto(() => ({
                        monto: json.monto,
                    }))
                }
            });
    }

    const handleClickOpen = () => {
        setOpen(true);
        calcularMontoFuncion();
    }


    const handleClose = (value) => {
        setOpen(false);

    };

    return (
        <div>
            <br/>
            <Button variant="outlined" onClick={handleClickOpen}>
                Calcular monto del carrito
            </Button>


            <SimpleDialog
                monto={monto.monto}
                mensaje={mensaje.mensaje}
                resultado={resultado.resultado}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}

function SimpleDialog(props) {
    const {onClose, open, monto, resultado, mensaje} = props;

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{resultado === "error" ? mensaje : "Monto a pagar"}</DialogTitle>
            {monto && (
                <DialogContent>
                    {monto} --> (con descuentos incluidos)
                </DialogContent>
            )}

        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};