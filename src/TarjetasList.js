import React, {useEffect, useState} from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {TarjetaService} from "./servicios/TarjetaService";

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

export default function TarjetasList({doTarjeta}) {
    const service = new TarjetaService();
    const [elegido, setElegido] = useState("");
    const [resultado, setResultado] = useState({resultado: ""});
    const [errors, setErrors] = useState({errors: {}});
    const [mensaje, setMensaje] = useState({mensaje: ""});
    const [tarjetas, setTarjetas] = useState({tarjetas: []});

    useEffect(() => {
        listarTarjetas();
    }, [doTarjeta]);

    const listarTarjetas = () => {
        service.allTarjetas().then((json) => {
            setTarjetas(() => ({
                tarjetas: json.tarjetas,
                resultado: json.result,
            }))

        });
    }


    const handleChange = (event) => {
        setElegido(event.target.value);
       // var result = tarjetas.tarjetas.filter(t => elegido.includes(t.tipo)).map(t => t.id)
        doTarjeta(event.target.value)
    };

    return (

        <div>
            <FormControl sx={{m: 1, width: 300}}>
                <InputLabel id="demo-multiple-checkbox-label">Tarjetas</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={elegido}
                    onChange={handleChange}
                    input={<OutlinedInput label="tarjeta"/>}
                    MenuProps={MenuProps}
                >
                    {tarjetas.tarjetas.map((c, index) => (
                        <MenuItem key={index} value={c.id}>
                            {c.tipo}
                        </MenuItem>
                    ))}


                </Select>
            </FormControl>
        </div>
    );

}
