import React, {useEffect, useState} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {ProductService} from "./servicios/ProductService";

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

export default function ProductSelect({doProducts}) {
    const service = new ProductService();
    const [productosElegidos, setProductosElegidos] = useState([])
    const [elegidos, setElegido] = useState([]);
    const [resultado, setResultado] = useState({resultado: ""});
    const [errors, setErrors] = useState({errors: {}});
    const [mensaje, setMensaje] = useState({mensaje: ""});
    const [productos, setProductos] = useState({productos: []});

    useEffect(() => {
        listarProductos();
        doProducts(elegidos)
    }, [doProducts, elegidos]);

    const listarProductos = () => {

        service.allProductos().then((json) => {
            setProductos(() => ({
                productos: json.productos,
                resultado: json.result,
            }))
        });

    }


    const handleChange = (event) => {
        const {
            target: {value},
        } = event;

        setElegido(
            typeof value === 'number' ? value.split(',') : value,
        );


    };

    return (

        <div>

            <FormControl sx={{m: 1, width: 300}}>
                <InputLabel id="demo-multiple-checkbox-label">Productos</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={elegidos}
                    onChange={handleChange}
                  //  input={<OutlinedInput label="producto"/>}
                   // renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {productos.productos.map((c, index) => (
                        <MenuItem key={index} value={c.id}>
                            {c.descripcion}
                        </MenuItem>
                    ))}


                </Select>
            </FormControl>

        </div>
    );

}