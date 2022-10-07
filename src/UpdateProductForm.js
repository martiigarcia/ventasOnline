import React, {useEffect, useState} from "react";
import {Alert, AlertTitle, Grid, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {ProductService} from "./servicios/ProductService";
import {CategoriaService} from "./servicios/CategoriaService";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {MarcaService} from "./servicios/MarcaService";

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

export default function ProductForm({productox}) {
    const categoriaService = new CategoriaService();
    const marcaService = new MarcaService();
    const productService = new ProductService();
    const [productUpdate, setProductUpdate] = useState({...productox})
    const [producto, setProducto] = useState({producto: {}});
    const [marca, setMarca] = useState({marca: {}});
    const [categoria, setCategoria] = useState({categoria: {}});
    const [categorias, setCategorias] = useState({categorias: []});
    const [marcas, setMarcas] = useState({marcas: []});
    const [elegidoCategoria, setElegidoCategoria] = useState("");
    const [elegidoMarca, setElegidoMarca] = useState("");
    const [resultado, setResultado] = useState({resultado: ""});
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState({mensaje: ""});
    const [productos, setProductos] = useState({productos: []});

    useEffect(() => {
        getProducto()
        listarCategorias();
        listarMarcas();
    }, []);

    const listarCategorias = () => {

        categoriaService.allCategorias().then((json) => {
            //console.log(json)
            setCategorias(() => ({
                categorias: json.categorias,
                resultado: json.result,
            }))
        });

    }
    const listarMarcas = () => {

        marcaService.allMarcas().then((json) => {
            console.log(json)
            setMarcas(() => ({
                marcas: json.marcas,
                resultado: json.result,
            }))
        });

    }
    const getProducto = async () => {

        await fetch("http://localhost:1234/productos")
            .then((resp) => resp.json()).then((json) => {

                console.log(json.productos.find(producto => producto.id === 11))

                setProducto({
                    producto: json.productos.find(producto => producto.id === 11),
                })
                setMarca({
                    marca: json.productos.find(producto => producto.id === 11).marca
                })
                setCategoria({
                    categoria: json.productos.find(producto => producto.id === 11).categoria
                })
            });
    }

    const handleChangeSelectCategoria = (event) => {
        setElegidoCategoria(event.target.value);
        setCategoria((state) => ({
            categoria: {
                ...state.categoria,
                id: event.target.value,
            },
        }));

    };
    const handleChangeSelectMarca = (event) => {
        setElegidoMarca(event.target.value);

        setMarca((state) => ({
            marca: {
                ...state.marca,
                id: event.target.value,
            },
        }));

    };
    const handleChange = (e) => {

        let nombre = e.target.name;
        let valor = e.target.value;


        setProducto((state) => ({
            producto: {
                ...state.producto,
                [nombre]: valor,
            },
        }));

    }

    const handleClick = () => {

        const params = {
            descripcion: producto.producto.descripcion,
            marca: {
                id: marca.marca.id,
                //nombre: "Acme"
            },
            precio: producto.producto.precio,
            codigo: producto.producto.codigo,
            categoria: {
                id: categoria.categoria.id,
                // nombre: "frutas"
            },
            id: 11,
            version: producto.producto.version
        }
        console.log(params)

        fetch("http://localhost:1234/update-producto", {
            method: "POST",
            body: JSON.stringify(params),
        }).then((resp) => resp.json())
            .then((json) => {
                if (json.result === "error") {
                    setResultado({resultado: json.result});
                    setMensaje({mensaje: "El producto ya fue modificado por otro usuario"});
                    setError(true);
                } else {
                    setResultado({resultado: json.result});
                    setMensaje({mensaje: json.message});
                }
            })
    }


    return (
        <div>
            <Box sx={{
                '& .MuiTextField-root': {m: 1},
            }}>
                <Grid container spacing={2}>

                    <Grid item xs={4}>

                        <br/>
                        <Typography sx={{m: 0, fontSize: 14, align: "center"}} color="text.secondary">
                            ID:
                        </Typography>
                        <TextField
                            value={"" + producto.producto.id}
                            disabled
                            style={{width: 300}}
                        />
                        <br/>

                        <Typography sx={{ml: 2, fontSize: 14, align: "center"}} color="text.secondary">
                            DESCRIPCION:
                        </Typography>
                        <TextField
                            style={{width: 300}}
                            value={producto.producto.descripcion}
                            name="descripcion"
                            onChange={handleChange}
                        />
                        <br/>

                        <Typography sx={{ml: 2, fontSize: 14, align: "center"}} color="text.secondary">
                            PRECIO:
                        </Typography>
                        <TextField name="precio" onChange={handleChange} value={producto.producto.precio}
                                   style={{width: 300}}/>
                        <br/>

                        <Typography sx={{ml: 2, fontSize: 14, align: "center"}} color="text.secondary">
                            MARCA: (actual - {marca.marca.nombre})
                        </Typography>

                        <FormControl sx={{m: 1, width: 300}}>

                            <InputLabel id="demo-multiple-checkbox-label">Marcas</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                value={elegidoMarca}
                                onChange={handleChangeSelectMarca}
                                input={<OutlinedInput label="marcas"/>}
                                MenuProps={MenuProps}
                            >
                                {marcas.marcas.map((c, index) => (
                                    <MenuItem key={index} value={c.id}>
                                        {c.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <br/>


                        <Typography sx={{ml: 2, fontSize: 14, align: "center"}} color="text.secondary">
                            CATEGORIA: (actual - {categoria.categoria.nombre})
                        </Typography>

                        <FormControl sx={{m: 1, width: 300}}>

                            <InputLabel id="demo-multiple-checkbox-label">Categorias</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                value={elegidoCategoria}
                                onChange={handleChangeSelectCategoria}
                                input={<OutlinedInput label="categoria"/>}
                                MenuProps={MenuProps}
                            >
                                {categorias.categorias.map((c, index) => (
                                    <MenuItem key={index} value={c.id}>
                                        {c.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Grid item marginTop={1}>
                            <Button variant={"contained"}
                                    style={{maxHeight: 48 * 4.5 + 8, width: 300}}
                                    sx={{m: 1}}
                                    onClick={handleClick}
                            >Modificar</Button>
                        </Grid>



                    </Grid>
                    <Stack sx={{width: 300, mb: "10px"}} spacing={2}>
                        {resultado.resultado && (
                            <Alert severity={resultado.resultado}>
                                <AlertTitle>
                                    {resultado.resultado === "error" ? "Error!" : "Éxito!"}
                                </AlertTitle>
                                {mensaje.mensaje}
                            </Alert>
                        )}
                    </Stack>
                </Grid>
            </Box>
        </div>
    )
}