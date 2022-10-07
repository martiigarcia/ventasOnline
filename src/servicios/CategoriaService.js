export class CategoriaService{
    allCategorias(){
        return fetch("http://localhost:1234/categorias")
            .then((resp) => resp.json());
    }
}