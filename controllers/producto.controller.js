const Contenedor = require("../clases/contenedor");

const contenedor = new Contenedor('productos');

function getAllProductos(req, res){

    contenedor.getAll().then(objetos => {
        return res.status(200).send(objetos); 
    }).catch(err => {
        return res.status(404).send(err); 
    });

}

function getProductoAleatorio(req, res){
    contenedor.getAll().then(objetos => {     
        //generar numero aleatorio y obtener el indice del array a mostrar
        let numAleatorio = Math.floor((Math.random() * (objetos.length - 0 + 1)) + 0);
        return res.status(200).send(objetos[numAleatorio])
    }).catch(err => {
        return res.status(404).send(err); 
    });
}

module.exports = {
    getAllProductos,
    getProductoAleatorio
}