export class TarjetaService{
    allTarjetas(){
        return fetch("http://localhost:1234/tarjetas")
            .then((resp) => resp.json());
    }
}