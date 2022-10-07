export class MarcaService{
    allMarcas(){
        return fetch("http://localhost:1234/marcas")
            .then((resp) => resp.json());
    }
}