import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {DialogContent} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function CalcularMonto({productos, tarjeta}) {
    const [open, setOpen] = React.useState(false);
    const [resultado, setResultado] = useState({resultado: ""});
    const [mensaje, setMensaje] = useState({mensaje: ""});
    const [monto, setMonto] = useState({monto: ""});
    const [error, setError] = useState(false);

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
                    setError(true);
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
        <div sx={{m: 1, width: 300}}>
            <br/>
            <Button variant={"contained"} color={"secondary"} onClick={handleClickOpen} style={{maxHeight: 48 * 4.5 + 8, width: 300}} sx={{m: 1}}>
                Calcular monto del carrito
            </Button>


            <SimpleDialog
                monto={monto.monto}
                mensaje={mensaje.mensaje}
                resultado={resultado.resultado}
                error = {error}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}

function SimpleDialog(props) {
    const {onClose, open, monto, resultado, mensaje, error} = props;

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{resultado === "error" ? mensaje : "Monto a pagar"}</DialogTitle>
            {monto &&  (
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