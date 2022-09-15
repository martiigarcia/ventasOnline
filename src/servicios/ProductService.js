export class ProductService{
    allProductos(){
        return fetch("http://localhost:1234/productos")
            .then((resp) => resp.json());
    }
}