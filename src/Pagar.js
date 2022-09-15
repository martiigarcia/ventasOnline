import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {useState, useEffect} from "react";
import PropTypes from "prop-types";


export default function Pagar({productos, tarjeta}) {
    const [open, setOpen] = React.useState(false);
    const [resultado, setResultado] = useState({resultado: ""});
    const [mensaje, setMensaje] = useState({mensaje: ""});

    useEffect(() => {
    }, [productos, tarjeta]);

    const pagarCompra = () => {

        const params = {
            productosX: productos,
            tarjetaX: tarjeta,
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };
        fetch("http://localhost:1234/pagar?productos=" + params.productosX + "&tarjeta=" + params.tarjetaX, options)
            .then(response => response.json())
            .then((json) => {
                if (json.result === "error") {
                    setResultado({resultado: json.result});
                    setMensaje({mensaje: json.message});
                } else {
                    setResultado({resultado: json.result});
                    setMensaje({mensaje: json.message});

                }
            });
    }

    const handleClickOpen = () => {
        setOpen(true);
        pagarCompra()
    };

    const handleClose = (value) => {
        setOpen(false);

    };

    return (
        <div>
            <br/>
            <Button variant="outlined" onClick={handleClickOpen}>
                Pagar carrito
            </Button>

            <SimpleDialog
                mensaje={mensaje.mensaje}
                resultado={resultado.resultado}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}
function SimpleDialog(props) {
    const {onClose,  open, resultado, mensaje} = props;

    const handleClose = () => {
        onClose();
    };


    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{resultado === "error" ? mensaje : "La venta se realizo exitosamente!"} </DialogTitle>

        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};
