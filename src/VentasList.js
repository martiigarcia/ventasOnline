import React, {useEffect, useState, useRef} from "react";
import {ProductService} from "./servicios/ProductService";
import {DataGrid} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {VentasService} from "./servicios/VentasService";

const columnas = [
    {field: 'id', headerName: 'ID', width: 130},
    {field: 'estado', headerName: 'ESTADO', width: 130},
    {field: 'montoAbonado', headerName: 'MONTO ABONADO', width: 160},
    {field: 'cliente', headerName: 'CLIENTE', width: 130},
]

export default function ListaVentas({}) {
    const ref = useRef();
    const service = new VentasService();


    const [resultado, setResultado] = useState({resultado: ""});
    const [errors, setErrors] = useState({errors: {}});
    const [mensaje, setMensaje] = useState({mensaje: ""});
    const [ventas, setVentas] = useState({ventas: []});

    useEffect(() => {
        listarVentas();
        //console.log(productos.productos.filter(p => elegidos.includes(p.id)).map(p => p.id));
    }, [ ]);

    const listarVentas = () => {

        service.allVentas().then((json) => {

            setVentas(() => ({
                ventas: json.ventas,
                resultado: json.result,
            }))
        });

    }


    return (
        <div style={{height: 400, width: '100%'}}>
            <TableContainer component={Paper} sx={{m: 1}}>
                <Table sx={{minWidth: 650, backgroundColor: "#F2F4F4", borderColor: "red"}} aria-label="simple table"
                       aria-labelledby="Marti">
                    <TableHead>
                        <TableRow style={{"background-color": "#AEB6BF"}}>
                            <TableCell align="center" colSpan={12} style={{'font-size': '20px', 'font-weight': '800'}}
                            >
                                LISTADO DE VENTAS
                            </TableCell>
                        </TableRow>
                        <TableRow style={{"background-color": "#D6DBDF"}}>

                            <TableCell align="center">CODIGO</TableCell>
                            <TableCell align="center">ESTADO</TableCell>
                            <TableCell align="center">MONTO ABONADO</TableCell>
                            <TableCell align="center">CLIENTE</TableCell>
                            <TableCell align="center">TARJETA</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/*<TableRow*/}
                        {/*    sx={{'&:last-child td, &:last-child th': {border: 0}}}*/}
                        {/*>*/}
                        {/*    <TableCell component="th" scope="row">*/}
                        {/*        17*/}
                        {/*    </TableCell>*/}
                        {/*    <TableCell align="center">N-AÑO</TableCell>*/}
                        {/*    <TableCell align="center">COMPLETA</TableCell>*/}
                        {/*    <TableCell align="center">34</TableCell>*/}
                        {/*    <TableCell align="center">MARTI</TableCell>*/}
                        {/*    <TableCell align="center">MERCADO PAGO</TableCell>*/}
                        {/*    <TableCell align="center">LISTA DE PRODUCTOS VENDIDOS</TableCell>*/}

                        {/*</TableRow>*/}

                        {ventas.ventas.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >

                                <TableCell align="center">{row.numeroVenta}</TableCell>
                                <TableCell align="center">{row.estado}</TableCell>
                                <TableCell align="center">${row.montoAbonado}</TableCell>
                                <TableCell align="center">{row.cliente.nombre}</TableCell>
                                <TableCell align="center">{row.tarjeta.tipo}</TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Table
                // ref={ref}
                // rows={productos.productos}
                //columns={columnas}
                // pageSize={5}
                // rowsPerPageOptions={[5]}
                // checkboxSelection
                // onSelectionChange={(newSelection) => {
                //     console.log(newSelection)
                //      setElegido(newSelection.rows);
                //     // doProducts(newSelection);
                // }}
            >


            </Table>

        </div>
    );
}
