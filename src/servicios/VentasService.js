export class VentasService{
    allVentas(){
        return fetch("http://localhost:1234/ventas")
            .then((resp) => resp.json());
    }
}